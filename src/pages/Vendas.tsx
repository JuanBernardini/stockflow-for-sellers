import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ProductList } from "@/components/Sales/ProductList";
import { Cart } from "@/components/Sales/Cart";
import { toast } from "sonner";

interface Product {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  status: "ativo" | "inativo";
}

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  maxQuantidade: number;
}

const Vendas = () => {
  // Mock products - in real app, fetch from API
  const [products] = useState<Product[]>([
    {
      id: "1",
      nome: "Maçã Gala",
      preco: 5.99,
      quantidade: 50,
      status: "ativo",
    },
    {
      id: "2",
      nome: "Banana Prata",
      preco: 3.49,
      quantidade: 100,
      status: "ativo",
    },
    {
      id: "3",
      nome: "Laranja Pera",
      preco: 4.99,
      quantidade: 75,
      status: "ativo",
    },
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantidade < product.quantidade) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          )
        );
        toast.success("Quantidade atualizada no carrinho");
      } else {
        toast.error("Quantidade máxima em estoque atingida");
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          nome: product.nome,
          preco: product.preco,
          quantidade: 1,
          maxQuantidade: product.quantidade,
        },
      ]);
      toast.success("Produto adicionado ao carrinho");
    }
  };

  const handleUpdateQuantity = (id: string, quantidade: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Produto removido do carrinho");
  };

  const handleFinalizeSale = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/vendas', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     items: cartItems.map(item => ({
      //       productId: item.id,
      //       quantidade: item.quantidade,
      //       preco: item.preco
      //     }))
      //   })
      // });

      toast.success("Venda finalizada com sucesso!");
      setCartItems([]);
    } catch (error) {
      toast.error("Erro ao finalizar venda. Tente novamente.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Registrar Venda
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products List */}
          <div className="bg-card p-6 rounded-lg shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Produtos
            </h2>
            <ProductList products={products} onAddToCart={handleAddToCart} />
          </div>

          {/* Cart */}
          <div className="bg-card p-6 rounded-lg shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Carrinho
            </h2>
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onFinalizeSale={handleFinalizeSale}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Vendas;
