import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ProductCard } from "@/components/Products/ProductCard";
import { ProductModal } from "@/components/Products/ProductModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import womanBoxes from "@/assets/woman-boxes.png";

interface Product {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  status: "ativo" | "inativo";
}

const Produtos = () => {
  const [products, setProducts] = useState<Product[]>([
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
      quantidade: 0,
      status: "inativo",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleToggleStatus = (product: Product) => {
    const newStatus = product.status === "ativo" ? "inativo" : "ativo";
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, status: newStatus } : p
      )
    );
    toast.success(
      `Produto ${newStatus === "ativo" ? "ativado" : "inativado"} com sucesso!`
    );
  };

  const handleSaveProduct = (product: Product) => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(
        products.map((p) => (p.id === selectedProduct.id ? { ...product, id: p.id } : p))
      );
      toast.success("Produto atualizado com sucesso!");
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id: Date.now().toString(),
      };
      setProducts([...products, newProduct]);
      toast.success("Produto criado com sucesso!");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-6">
            <h1 className="text-4xl font-bold text-foreground">Meus Produtos</h1>
            <img
              src={womanBoxes}
              alt="Gerenciar produtos"
              className="hidden lg:block h-24 rounded-lg object-cover"
            />
          </div>
          <Button onClick={handleAddProduct} size="lg" className="font-semibold">
            <Plus className="mr-2 h-5 w-5" />
            NOVO PRODUTO
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhum produto cadastrado ainda.
            </p>
          </div>
        )}
      </div>

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />
    </DashboardLayout>
  );
};

export default Produtos;
