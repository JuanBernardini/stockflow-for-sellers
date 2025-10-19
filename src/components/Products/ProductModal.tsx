// src/components/Products/ProductModal.tsx (Corrigido)

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
// --- ALTERAÇÃO: Importando o tipo centralizado ---
import { Product } from "@/types";

// Define os dados que o formulário manipula, omitindo campos que não são editáveis pelo usuário
type ProductFormData = Omit<Product, 'id' | 'status'>;

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  // --- ALTERAÇÃO: onSave agora usa o tipo do formulário ---
  onSave: (product: ProductFormData) => void;
  product?: Product | null;
}

export function ProductModal({ open, onClose, onSave, product }: ProductModalProps) {
  // --- ALTERAÇÃO: O estado do formulário usa o tipo correto ---
  const [formData, setFormData] = useState<ProductFormData>({
    nome: "",
    preco: 0,
    quantidade: 0,
    imagem: "",
  });

  useEffect(() => {
    if (product) {
      // Se estiver editando, preenche o formulário com os dados do produto
      setFormData({
        nome: product.nome,
        preco: product.preco,
        quantidade: product.quantidade,
        imagem: product.imagem || "",
      });
    } else {
      // Se for um novo produto, limpa o formulário
      setFormData({
        nome: "",
        preco: 0,
        quantidade: 0,
        imagem: "",
      });
    }
  }, [product, open]); // Re-executa quando o produto ou o estado 'open' mudam

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
          
          {/* --- ALTERAÇÃO: Adicionado o campo de imagem que faltava --- */}
          <div className="space-y-2">
            <Label htmlFor="imagem">URL da Imagem (Opcional)</Label>
            <Input
              id="imagem"
              value={formData.imagem}
              onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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