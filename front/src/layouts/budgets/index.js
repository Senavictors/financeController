/**
=========================================================
* Finance Controller - Página de Orçamentos
=========================================================

* Página para gerenciar orçamentos por categoria e acompanhar gastos
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import LinearProgress from "@mui/material/LinearProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PieChart from "examples/Charts/PieChart";

function Budgets() {
  const [selectedMonth, setSelectedMonth] = useState("Novembro/2024");

  const budgetCategories = [
    {
      category: "Alimentação",
      budgeted: 1200.0,
      spent: 890.5,
      remaining: 309.5,
      percentage: 74,
      color: "info",
      icon: "restaurant",
    },
    {
      category: "Transporte",
      budgeted: 600.0,
      spent: 580.0,
      remaining: 20.0,
      percentage: 97,
      color: "warning",
      icon: "directions_car",
    },
    {
      category: "Entretenimento",
      budgeted: 400.0,
      spent: 245.9,
      remaining: 154.1,
      percentage: 61,
      color: "success",
      icon: "movie",
    },
    {
      category: "Saúde",
      budgeted: 300.0,
      spent: 150.0,
      remaining: 150.0,
      percentage: 50,
      color: "error",
      icon: "local_hospital",
    },
    {
      category: "Educação",
      budgeted: 500.0,
      spent: 0.0,
      remaining: 500.0,
      percentage: 0,
      color: "dark",
      icon: "school",
    },
    {
      category: "Compras",
      budgeted: 800.0,
      spent: 1200.0,
      remaining: -400.0,
      percentage: 150,
      color: "error",
      icon: "shopping_cart",
    },
  ];

  const pieChartData = {
    labels: budgetCategories.map((cat) => cat.category),
    datasets: {
      label: "Gastos por Categoria",
      data: budgetCategories.map((cat) => cat.spent),
    },
  };

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const overallPercentage = (totalSpent / totalBudgeted) * 100;

  const getStatusBadge = (percentage) => {
    if (percentage >= 100) return { color: "error", text: "Estourado" };
    if (percentage >= 90) return { color: "warning", text: "Quase Cheio" };
    if (percentage >= 70) return { color: "info", text: "Moderado" };
    return { color: "success", text: "Sob Controle" };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          {/* Header com resumo geral */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <MDTypography variant="h4" fontWeight="medium">
                      Orçamento Mensal
                    </MDTypography>
                    <MDTypography variant="button" color="text">
                      Acompanhe seus gastos por categoria e mantenha-se dentro do orçamento
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDButton variant="gradient" color="info" fullWidth>
                      <Icon>add</Icon>&nbsp;Nova Categoria
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Resumo geral do orçamento */}
          <Grid item xs={12} md={4}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Resumo do Mês
                  </MDTypography>
                  <MDTypography variant="button" color="info">
                    {selectedMonth}
                  </MDTypography>
                </MDBox>

                <MDBox mb={3}>
                  <MDBox display="flex" justifyContent="space-between" mb={1}>
                    <MDTypography variant="button" color="text">
                      Orçado
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="medium">
                      R$ {totalBudgeted.toFixed(2).replace(".", ",")}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" justifyContent="space-between" mb={1}>
                    <MDTypography variant="button" color="text">
                      Gasto
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="medium" color="error">
                      R$ {totalSpent.toFixed(2).replace(".", ",")}
                    </MDTypography>
                  </MDBox>
                  <MDBox display="flex" justifyContent="space-between" mb={2}>
                    <MDTypography variant="button" color="text">
                      Restante
                    </MDTypography>
                    <MDTypography
                      variant="button"
                      fontWeight="medium"
                      color={totalRemaining >= 0 ? "success" : "error"}
                    >
                      R$ {totalRemaining.toFixed(2).replace(".", ",")}
                    </MDTypography>
                  </MDBox>

                  <MDBox mb={1}>
                    <MDTypography variant="caption" color="text">
                      Progresso Geral: {overallPercentage.toFixed(1)}%
                    </MDTypography>
                  </MDBox>
                  <LinearProgress
                    variant="determinate"
                    value={overallPercentage > 100 ? 100 : overallPercentage}
                    color={
                      overallPercentage >= 100
                        ? "error"
                        : overallPercentage >= 90
                        ? "warning"
                        : "info"
                    }
                    sx={{ height: "8px", borderRadius: "4px" }}
                  />
                </MDBox>

                <MDBox display="flex" justifyContent="center">
                  <MDBadge
                    badgeContent={getStatusBadge(overallPercentage).text}
                    color={getStatusBadge(overallPercentage).color}
                    variant="gradient"
                    size="lg"
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Gráfico de pizza */}
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Distribuição de Gastos
                </MDTypography>
                <MDBox height="300px">
                  <PieChart
                    title="Gastos por Categoria"
                    description="Distribuição dos gastos do mês"
                    chart={pieChartData}
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Lista de categorias */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Categorias de Orçamento
                </MDTypography>
                <Grid container spacing={3}>
                  {budgetCategories.map((category, index) => {
                    const status = getStatusBadge(category.percentage);
                    return (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card>
                          <MDBox p={2}>
                            <MDBox
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={2}
                            >
                              <MDBox display="flex" alignItems="center">
                                <Icon color={category.color} sx={{ mr: 1 }}>
                                  {category.icon}
                                </Icon>
                                <MDTypography variant="h6" fontWeight="medium">
                                  {category.category}
                                </MDTypography>
                              </MDBox>
                              <MDBadge
                                badgeContent={status.text}
                                color={status.color}
                                variant="gradient"
                                size="sm"
                              />
                            </MDBox>

                            <MDBox mb={2}>
                              <MDBox display="flex" justifyContent="space-between" mb={1}>
                                <MDTypography variant="caption" color="text">
                                  Orçado
                                </MDTypography>
                                <MDTypography variant="caption" fontWeight="medium">
                                  R$ {category.budgeted.toFixed(2).replace(".", ",")}
                                </MDTypography>
                              </MDBox>
                              <MDBox display="flex" justifyContent="space-between" mb={1}>
                                <MDTypography variant="caption" color="text">
                                  Gasto
                                </MDTypography>
                                <MDTypography variant="caption" fontWeight="medium" color="error">
                                  R$ {category.spent.toFixed(2).replace(".", ",")}
                                </MDTypography>
                              </MDBox>
                              <MDBox display="flex" justifyContent="space-between" mb={2}>
                                <MDTypography variant="caption" color="text">
                                  Restante
                                </MDTypography>
                                <MDTypography
                                  variant="caption"
                                  fontWeight="medium"
                                  color={category.remaining >= 0 ? "success" : "error"}
                                >
                                  R$ {category.remaining.toFixed(2).replace(".", ",")}
                                </MDTypography>
                              </MDBox>

                              <MDBox mb={1}>
                                <MDTypography variant="caption" color="text">
                                  Progresso: {category.percentage}%
                                </MDTypography>
                              </MDBox>
                              <LinearProgress
                                variant="determinate"
                                value={category.percentage > 100 ? 100 : category.percentage}
                                color={category.color}
                                sx={{ height: "6px", borderRadius: "3px" }}
                              />
                            </MDBox>

                            <MDBox display="flex" gap={1}>
                              <MDButton
                                variant="outlined"
                                color={category.color}
                                size="small"
                                fullWidth
                              >
                                Editar
                              </MDButton>
                              <MDButton variant="text" color={category.color} size="small">
                                <Icon>more_vert</Icon>
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Budgets;
