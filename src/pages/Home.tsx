import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import womanBasket from "@/assets/woman-basket.png";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      toast.success("Login realizado com sucesso!");
      navigate("/produtos");
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={womanBasket}
          alt="Mulher com cesta de vegetais"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <img src={logo} alt="Logo" className="h-20 w-20" />
            <h1 className="text-4xl font-bold text-foreground">
              Acesse seu Estoque
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold">
              ENTRAR
            </Button>
          </form>

          <p className="text-center text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link to="/cadastro" className="text-primary hover:text-primary-hover font-medium">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
