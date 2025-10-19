// Vendas.tsx (Integrado e Corrigido)

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ProductList } from "@/components/Sales/ProductList";
import { Cart } from "@/components/Sales/Cart";
import { toast } from "sonner";
import { getProducts, createSale } from "@/lib/api";
// --- ALTERAÇÃO: Importando os tipos centrais ---
import { Product, CartItem } from "@/types";

const Vendas = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      const availableProducts = response.data.filter(p => p.status === 'Ativo' && p.quantidade > 0);
      setProducts(availableProducts);
    } catch (error) {
      toast.error("Erro ao carregar produtos.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // --- ALTERAÇÃO: Usando 'id' ---
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantidade < product.quantidade) {
        handleUpdateQuantity(product.id, existingItem.quantidade + 1);
        toast.info("Quantidade atualizada no carrinho");
      } else {
        toast.error("Quantidade máxima em estoque atingida");
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id, // --- ALTERAÇÃO: Usando 'id' ---
          nome: product.nome,
          preco: product.preco,
          quantidade: 1,
          maxQuantidade: product.quantidade,
        },
      ]);
      toast.success("Produto adicionado ao carrinho");
    }
  };

  const handleUpdateQuantity = (id: number, quantidade: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Produto removido do carrinho");
  };

  const handleFinalizeSale = async () => {
    if (cartItems.length === 0) {
      toast.warning("O carrinho está vazio.");
      return;
    }
    try {
      const saleData = {
        produtos: cartItems.map(item => ({
          produto_id: item.id, // A API espera 'produto_id', então fazemos a conversão aqui
          quantidade: item.quantidade
        }))
      };

      await createSale(saleData);

      toast.success("Venda finalizada com sucesso!");
      setCartItems([]);
      fetchProducts();
    } catch (error: any) {
      const errorMessage = error.response?.data?.erro || "Erro ao finalizar venda. Tente novamente.";
      toast.error(errorMessage);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Registrar Venda</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">Produtos</h2>
            <ProductList products={products} onAddToCart={handleAddToCart} />
          </div>
          <div className="bg-card p-6 rounded-lg shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">Carrinho</h2>
            <Cart items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onFinalizeSale={handleFinalizeSale} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Vendas;