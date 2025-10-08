import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Power } from "lucide-react";

interface Product {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  status: "ativo" | "inativo";
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onToggleStatus: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onToggleStatus }: ProductCardProps) {
  return (
    <Card className="shadow-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground">{product.nome}</h3>
          <Badge
            variant={product.status === "ativo" ? "default" : "secondary"}
            className={
              product.status === "ativo"
                ? "bg-success text-success-foreground"
                : "bg-muted text-muted-foreground"
            }
          >
            {product.status === "ativo" ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Preço:</span>
          <span className="text-lg font-semibold text-foreground">
            R$ {product.preco.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Quantidade:</span>
          <span className="text-base font-medium text-foreground">
            {product.quantidade} un.
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(product)}
          className="flex-1"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button
          variant={product.status === "ativo" ? "secondary" : "default"}
          size="sm"
          onClick={() => onToggleStatus(product)}
          className="flex-1"
        >
          <Power className="h-4 w-4 mr-2" />
          {product.status === "ativo" ? "Inativar" : "Ativar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
