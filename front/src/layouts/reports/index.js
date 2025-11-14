/**
=========================================================
* Finance Controller - Página de Relatórios
=========================================================

* Página com análises detalhadas e relatórios financeiros
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import PieChart from "examples/Charts/PieChart";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");

  const monthlyData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    datasets: {
      label: "Receitas vs Despesas",
      data: [
        { receita: 5200, despesa: 3800 },
        { receita: 5500, despesa: 4100 },
        { receita: 5800, despesa: 4500 },
        { receita: 6100, despesa: 4800 },
        { receita: 5900, despesa: 4600 },
        { receita: 6200, despesa: 4900 },
        { receita: 6500, despesa: 5200 },
        { receita: 6300, despesa: 5000 },
        { receita: 6600, despesa: 5300 },
        { receita: 6800, despesa: 5500 },
        { receita: 7000, despesa: 5700 },
        { receita: 7200, despesa: 5900 },
      ],
    },
  };

  const categoryData = {
    labels: [
      "Alimentação",
      "Transporte",
      "Moradia",
      "Entretenimento",
      "Saúde",
      "Educação",
      "Outros",
    ],
    datasets: {
      label: "Gastos por Categoria",
      data: [1200, 800, 2500, 600, 400, 800, 1200],
    },
  };

  const cashFlowData = {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"],
    datasets: {
      label: "Fluxo de Caixa Semanal",
      data: [1200, -800, 1500, -600],
    },
  };

  const financialSummary = [
    {
      title: "Receita Total",
      value: "R$ 75.400,00",
      change: "+12% vs ano anterior",
      color: "success",
      icon: "trending_up",
    },
    {
      title: "Despesa Total",
      value: "R$ 63.200,00",
      change: "+8% vs ano anterior",
      color: "error",
      icon: "trending_down",
    },
    {
      title: "Economia Líquida",
      value: "R$ 12.200,00",
      change: "+45% vs ano anterior",
      color: "info",
      icon: "savings",
    },
    {
      title: "Taxa de Poupança",
      value: "16,2%",
      change: "+3,5pp vs ano anterior",
      color: "primary",
      icon: "account_balance",
    },
  ];

  const renderOverview = () => (
    <Grid container spacing={3}>
      {/* Resumo financeiro */}
      <Grid item xs={12}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" fontWeight="medium" mb={3}>
              Resumo Financeiro - 2024
            </MDTypography>
            <Grid container spacing={3}>
              {financialSummary.map((item, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <MDBox textAlign="center">
                    <MDBox display="flex" justifyContent="center" mb={1}>
                      <Icon color={item.color} fontSize="large">
                        {item.icon}
                      </Icon>
                    </MDBox>
                    <MDTypography variant="h5" fontWeight="medium" color={item.color}>
                      {item.value}
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      {item.title}
                    </MDTypography>
                    <MDTypography variant="caption" color={item.color} display="block">
                      {item.change}
                    </MDTypography>
                  </MDBox>
                </Grid>
              ))}
            </Grid>
          </MDBox>
        </Card>
      </Grid>

      {/* Gráfico de barras - Receitas vs Despesas */}
      <Grid item xs={12} lg={8}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" fontWeight="medium" mb={3}>
              Receitas vs Despesas Mensais
            </MDTypography>
            <MDBox height="300px">
              <ReportsBarChart
                color="info"
                title="Comparativo Mensal"
                description="Receitas e despesas ao longo do ano"
                chart={monthlyData}
              />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>

      {/* Gráfico de pizza - Gastos por categoria */}
      <Grid item xs={12} lg={4}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" fontWeight="medium" mb={3}>
              Gastos por Categoria
            </MDTypography>
            <MDBox height="300px">
              <PieChart
                title="Distribuição de Gastos"
                description="Percentual de gastos por categoria"
                chart={categoryData}
              />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>

      {/* Gráfico de linha - Evolução do patrimônio */}
      <Grid item xs={12}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" fontWeight="medium" mb={3}>
              Evolução do Patrimônio Líquido
            </MDTypography>
            <MDBox height="300px">
              <ReportsLineChart
                color="success"
                title="Crescimento do Patrimônio"
                description="Evolução mensal do patrimônio líquido"
                chart={reportsLineChartData.sales}
              />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );

  const renderCashFlow = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" fontWeight="medium" mb={3}>
              Fluxo de Caixa Semanal
            </MDTypography>
            <MDBox height="400px">
              <ReportsBarChart
                color="info"
                title="Entradas e Saídas"
                description="Fluxo de caixa semanal detalhado"
                chart={cashFlowData}
              />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          {/* Header com controles */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <MDTypography variant="h4" fontWeight="medium">
                      Relatórios Financeiros
                    </MDTypography>
                    <MDTypography variant="button" color="text">
                      Análises detalhadas do seu perfil financeiro
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MDButton
                      variant={selectedPeriod === "month" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setSelectedPeriod("month")}
                      fullWidth
                    >
                      Mensal
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MDButton
                      variant={selectedPeriod === "year" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setSelectedPeriod("year")}
                      fullWidth
                    >
                      Anual
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Abas de relatórios */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={2}>
                <Grid container spacing={1}>
                  <Grid item>
                    <MDButton
                      variant={selectedReport === "overview" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setSelectedReport("overview")}
                    >
                      <Icon>assessment</Icon>&nbsp;Visão Geral
                    </MDButton>
                  </Grid>
                  <Grid item>
                    <MDButton
                      variant={selectedReport === "cashflow" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setSelectedReport("cashflow")}
                    >
                      <Icon>waterfall_chart</Icon>&nbsp;Fluxo de Caixa
                    </MDButton>
                  </Grid>
                  <Grid item>
                    <MDButton
                      variant={selectedReport === "investments" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setSelectedReport("investments")}
                    >
                      <Icon>trending_up</Icon>&nbsp;Investimentos
                    </MDButton>
                  </Grid>
                  <Grid item>
                    <MDButton
                      variant={selectedReport === "taxes" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setSelectedReport("taxes")}
                    >
                      <Icon>receipt</Icon>&nbsp;Impostos
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Conteúdo dos relatórios */}
          <Grid item xs={12}>
            {selectedReport === "overview" && renderOverview()}
            {selectedReport === "cashflow" && renderCashFlow()}
            {selectedReport === "investments" && (
              <Card>
                <MDBox p={3} textAlign="center">
                  <Icon fontSize="large" color="info" sx={{ mb: 2 }}>
                    construction
                  </Icon>
                  <MDTypography variant="h6" fontWeight="medium">
                    Em Desenvolvimento
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    Relatório de investimentos estará disponível em breve.
                  </MDTypography>
                </MDBox>
              </Card>
            )}
            {selectedReport === "taxes" && (
              <Card>
                <MDBox p={3} textAlign="center">
                  <Icon fontSize="large" color="info" sx={{ mb: 2 }}>
                    construction
                  </Icon>
                  <MDTypography variant="h6" fontWeight="medium">
                    Em Desenvolvimento
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    Relatório de impostos estará disponível em breve.
                  </MDTypography>
                </MDBox>
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Reports;
