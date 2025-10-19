// ProductCard.tsx (Corrigido)

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Power, PowerOff } from "lucide-react"; // Adicionei PowerOff para clareza
// --- ALTERAÇÃO: Importando o tipo central ---
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onToggleStatus: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onToggleStatus }: ProductCardProps) {
  // --- ALTERAÇÃO: Verificando o status da API (letra maiúscula) ---
  const isAtivo = product.status === "Ativo";

  return (
    <Card className="shadow-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground">{product.nome}</h3>
          <Badge
            variant={isAtivo ? "default" : "secondary"}
            className={isAtivo ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}
          >
            {isAtivo ? "Ativo" : "Inativo"}
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
        <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="flex-1">
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button
          // --- ALTERAÇÃO: Ajuste na variante do botão ---
          variant={isAtivo ? "secondary" : "default"}
          size="sm"
          onClick={() => onToggleStatus(product)}
          className="flex-1"
        >
          {isAtivo ? <PowerOff className="h-4 w-4 mr-2" /> : <Power className="h-4 w-4 mr-2" />}
          {isAtivo ? "Inativar" : "Ativar"}
        </Button>
      </CardFooter>
    </Card>
  );
}