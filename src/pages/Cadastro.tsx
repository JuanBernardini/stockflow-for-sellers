// Cadastro.tsx (Integrado)

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
// --- ALTERAÇÃO ---
import { registerVendedor } from "@/lib/api";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    // --- ALTERAÇÃO: Adicionados campos que faltavam ---
    cnpj: "",
    celular: "",
    email: "",
    senha: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.cnpj || !formData.celular || !formData.email || !formData.senha || !formData.confirmPassword) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    if (formData.senha !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      const response = await registerVendedor({
        nome: formData.nome,
        cnpj: formData.cnpj,
        celular: formData.celular,
        email: formData.email,
        senha: formData.senha,
      });

      // --- ALTERAÇÃO: Pega o ID do vendedor da resposta da API ---
      const { id } = response.data.vendedor;

      toast.success("Cadastro realizado com sucesso! Siga para a ativação.");
      
      // --- ALTERAÇÃO: Redireciona para a página de ativação com o ID ---
      navigate(`/ativacao/${id}`);

    } catch (error: any) {
      const errorMessage = error.response?.data?.erro || "Erro ao realizar cadastro. Tente novamente.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <img src={logo} alt="Logo" className="h-20 w-20" />
          <h1 className="text-4xl font-bold text-foreground">Criar Conta</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input id="nome" type="text" placeholder="Seu nome" value={formData.nome} onChange={handleChange} className="h-12" />
          </div>
          {/* --- ALTERAÇÃO: Novos campos --- */}
          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input id="cnpj" type="text" placeholder="00.000.000/0000-00" value={formData.cnpj} onChange={handleChange} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="celular">Celular</Label>
            <Input id="celular" type="text" placeholder="(11) 99999-9999" value={formData.celular} onChange={handleChange} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" type="password" placeholder="••••••••" value={formData.senha} onChange={handleChange} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="h-12" />
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold">CADASTRAR</Button>
        </form>

        <p className="text-center text-muted-foreground">
          Já tem uma conta?{" "}
          <Link to="/" className="text-primary hover:text-primary-hover font-medium">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;