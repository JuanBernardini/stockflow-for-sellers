import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  maxQuantidade: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantidade: number) => void;
  onRemoveItem: (id: string) => void;
  onFinalizeSale: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onFinalizeSale }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-card rounded-lg shadow-card space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.nome}</h4>
                <p className="text-sm text-muted-foreground">
                  R$ {item.preco.toFixed(2)} cada
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantidade - 1))}
                disabled={item.quantidade <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max={item.maxQuantidade}
                value={item.quantidade}
                onChange={(e) => {
                  const newQty = parseInt(e.target.value) || 1;
                  onUpdateQuantity(
                    item.id,
                    Math.min(item.maxQuantidade, Math.max(1, newQty))
                  );
                }}
                className="w-20 text-center"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onUpdateQuantity(
                    item.id,
                    Math.min(item.maxQuantidade, item.quantidade + 1)
                  )
                }
                disabled={item.quantidade >= item.maxQuantidade}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="ml-auto font-semibold text-foreground">
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Carrinho vazio. Adicione produtos para iniciar uma venda.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">Total:</span>
          <span className="text-2xl font-bold text-primary">
            R$ {total.toFixed(2)}
          </span>
        </div>

        <Button
          onClick={onFinalizeSale}
          disabled={items.length === 0}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          FINALIZAR VENDA
        </Button>
      </div>
    </div>
  );
}
