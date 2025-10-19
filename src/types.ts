// Este arquivo define a estrutura dos dados que vêm da sua API
// e que serão usados em toda a aplicação front-end.

export interface Product {
  id: number; // A API retorna o ID como número
  nome: string;
  preco: number;
  quantidade: number;
  status: "Ativo" | "Inativo"; // O status da API vem com letra maiúscula
  imagem?: string;
}

export interface CartItem {
  id: number; // Padronizando o ID como número
  nome: string;
  preco: number;
  quantidade: number; // Quantidade no carrinho
  maxQuantidade: number; // Estoque disponível do produto
}