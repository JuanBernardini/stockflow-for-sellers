import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, AlertCircle, DollarSign, BarChart3 } from "lucide-react";

const Dashboards = () => {
  // Mock data - substituir com dados reais da API
  const salesData = {
    totalVendas: 156,
    valorTotal: 45320.50,
    ticketMedio: 290.52,
    vendaHoje: 12,
  };

  const productData = {
    totalProdutos: 48,
    produtosAtivos: 42,
    produtosInativos: 6,
    estoqueBaixo: 8,
  };

  const topProducts = [
    { nome: "Produto A", vendas: 45, valor: 12500 },
    { nome: "Produto B", vendas: 38, valor: 9800 },
    { nome: "Produto C", vendas: 32, valor: 8600 },
    { nome: "Produto D", vendas: 28, valor: 7200 },
    { nome: "Produto E", vendas: 21, valor: 5400 },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboards</h1>
          <p className="text-muted-foreground">Visão geral de vendas e produtos</p>
        </div>

        {/* Dashboard 1: Resumo de Vendas */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            Resumo de Vendas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Total de Vendas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{salesData.totalVendas}</div>
                <p className="text-xs text-muted-foreground mt-1">vendas realizadas</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Valor Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  R$ {salesData.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">em vendas</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Ticket Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  R$ {salesData.ticketMedio.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">por venda</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Vendas Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{salesData.vendaHoje}</div>
                <p className="text-xs text-muted-foreground mt-1">vendas realizadas hoje</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dashboard 2: Status de Produtos */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            Status de Produtos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Total de Produtos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{productData.totalProdutos}</div>
                <p className="text-xs text-muted-foreground mt-1">produtos cadastrados</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Package className="h-4 w-4 text-success" />
                  Produtos Ativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">{productData.produtosAtivos}</div>
                <p className="text-xs text-muted-foreground mt-1">disponíveis para venda</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Produtos Inativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-muted-foreground">{productData.produtosInativos}</div>
                <p className="text-xs text-muted-foreground mt-1">não disponíveis</p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-lg transition-shadow border-destructive/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  Estoque Baixo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">{productData.estoqueBaixo}</div>
                <p className="text-xs text-muted-foreground mt-1">produtos com pouco estoque</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dashboard 3: Produtos Mais Vendidos */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Produtos Mais Vendidos
          </h2>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Top 5 Produtos</CardTitle>
              <CardDescription>Produtos com maior número de vendas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.nome}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{product.nome}</h4>
                        <p className="text-sm text-muted-foreground">
                          {product.vendas} unidades vendidas
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        R$ {product.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-muted-foreground">receita total</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboards;
