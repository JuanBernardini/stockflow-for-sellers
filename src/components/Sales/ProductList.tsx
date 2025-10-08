import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

interface Product {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  status: "ativo" | "inativo";
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.status === "ativo" &&
      product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-card rounded-lg shadow-card hover:shadow-lg transition-shadow"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{product.nome}</h4>
              <p className="text-sm text-muted-foreground">
                R$ {product.preco.toFixed(2)} • Estoque: {product.quantidade}
              </p>
            </div>
            <Button
              onClick={() => onAddToCart(product)}
              size="sm"
              disabled={product.quantidade === 0}
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Nenhum produto encontrado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
