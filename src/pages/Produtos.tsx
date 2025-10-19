// Produtos.tsx (Integrado e Corrigido)

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ProductCard } from "@/components/Products/ProductCard";
import { ProductModal } from "@/components/Products/ProductModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import womanBoxes from "@/assets/woman-boxes.png";
import { getProducts, createProduct, updateProduct, activateProduct, deactivateProduct } from "@/lib/api";
// --- ALTERAÇÃO: Importando o tipo central ---
import { Product } from "@/types";

const Produtos = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      toast.error("Erro ao buscar produtos. Tente recarregar a página.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      if (product.status === "Ativo") {
        await deactivateProduct(product.id);
        toast.success("Produto inativado com sucesso!");
      } else {
        await activateProduct(product.id);
        toast.success("Produto ativado com sucesso!");
      }
      fetchProducts();
    } catch (error) {
      toast.error("Erro ao alterar o status do produto.");
    }
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id' | 'status'>) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await createProduct(productData);
        toast.success("Produto criado com sucesso!");
      }
      setModalOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error("Erro ao salvar o produto.");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-6">
            <h1 className="text-4xl font-bold text-foreground">Meus Produtos</h1>
            <img src={womanBoxes} alt="Gerenciar produtos" className="hidden lg:block h-24 rounded-lg object-cover" />
          </div>
          <Button onClick={handleAddProduct} size="lg" className="font-semibold">
            <Plus className="mr-2 h-5 w-5" />
            NOVO PRODUTO
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onEdit={handleEditProduct} onToggleStatus={handleToggleStatus} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum produto cadastrado ainda.</p>
          </div>
        )}
      </div>

      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveProduct} product={selectedProduct} />
    </DashboardLayout>
  );
};

export default Produtos;