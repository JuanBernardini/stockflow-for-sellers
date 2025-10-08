import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  id?: string;
  nome: string;
  preco: number;
  quantidade: number;
  status: "ativo" | "inativo";
}

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
}

export function ProductModal({ open, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState<Product>({
    nome: "",
    preco: 0,
    quantidade: 0,
    status: "ativo",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        nome: "",
        preco: 0,
        quantidade: 0,
        status: "ativo",
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {product ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Produto</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Digite o nome do produto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input
              id="preco"
              type="number"
              step="0.01"
              min="0"
              value={formData.preco}
              onChange={(e) =>
                setFormData({ ...formData, preco: parseFloat(e.target.value) || 0 })
              }
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input
              id="quantidade"
              type="number"
              min="0"
              value={formData.quantidade}
              onChange={(e) =>
                setFormData({ ...formData, quantidade: parseInt(e.target.value) || 0 })
              }
              placeholder="0"
              required
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? "Salvar Alterações" : "Criar Produto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
