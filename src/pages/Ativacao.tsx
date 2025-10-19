// src/pages/Ativacao.tsx

import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { activateVendedor } from "@/lib/api"; // Importa a função da API

const Ativacao = () => {
  const [codigo, setCodigo] = useState("");
  const { vendedorId } = useParams(); // Pega o ID do vendedor da URL
  const navigate = useNavigate();

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codigo) {
      toast.error("Por favor, insira o código de ativação.");
      return;
    }
    if (!vendedorId) {
        toast.error("ID do vendedor não encontrado. Por favor, tente se cadastrar novamente.");
        return;
    }

    try {
      // Chama a API de ativação com o ID da URL e o código do formulário
      await activateVendedor({
        vendedor_id: parseInt(vendedorId, 10), // A API espera um número
        codigo: codigo,
      });
      
      toast.success("Conta ativada com sucesso! Agora você pode fazer login.");
      navigate("/"); // Redireciona para a página de login
    } catch (error: any) {
      const errorMessage = error.response?.data?.erro || "Código de ativação inválido. Tente novamente.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-6">
          <img src={logo} alt="Logo" className="h-20 w-20" />
          <h1 className="text-4xl font-bold text-foreground">
            Ative sua Conta
          </h1>
          <p className="text-center text-muted-foreground">
            Enviamos um código de ativação para o seu WhatsApp. Por favor, insira-o abaixo para continuar.
          </p>
        </div>

        <form onSubmit={handleActivation} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="codigo">Código de Ativação</Label>
            <Input
              id="codigo"
              type="text"
              placeholder="1234"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="h-12 text-center tracking-widest text-lg"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold">
            ATIVAR CONTA
          </Button>
        </form>

        <p className="text-center text-muted-foreground">
          Já ativou sua conta?{" "}
          <Link to="/" className="text-primary hover:text-primary-hover font-medium">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Ativacao;