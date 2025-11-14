/**
=========================================================
* Finance Controller - Página de Metas
=========================================================

* Página para definir e acompanhar metas financeiras
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

function Goals() {
  const [activeTab, setActiveTab] = useState("active");

  const activeGoals = [
    {
      id: 1,
      title: "Emergência - 6 meses de gastos",
      description: "Economizar o equivalente a 6 meses de despesas fixas",
      targetAmount: 25000,
      currentAmount: 15000,
      monthlyContribution: 1200,
      deadline: "Dez/2025",
      priority: "high",
      category: "Segurança Financeira",
      color: "info",
      icon: "emergency",
    },
    {
      id: 2,
      title: "Viagem para Europa",
      description: "Realizar viagem dos sonhos pela Europa",
      targetAmount: 15000,
      currentAmount: 4500,
      monthlyContribution: 800,
      deadline: "Jul/2025",
      priority: "medium",
      category: "Lazer",
      color: "success",
      icon: "flight",
    },
    {
      id: 3,
      title: "Entrada para Imóvel",
      description: "Economizar para entrada de um apartamento",
      targetAmount: 80000,
      currentAmount: 25000,
      monthlyContribution: 2000,
      deadline: "Dez/2026",
      priority: "high",
      category: "Investimento",
      color: "primary",
      icon: "home",
    },
    {
      id: 4,
      title: "Novo Carro",
      description: "Trocar de carro - entrada de R$ 25.000",
      targetAmount: 25000,
      currentAmount: 8000,
      monthlyContribution: 1000,
      deadline: "Mar/2026",
      priority: "low",
      category: "Compra",
      color: "warning",
      icon: "directions_car",
    },
  ];

  const completedGoals = [
    {
      id: 5,
      title: "Curso de Pós-Graduação",
      description: "Financiar curso de pós-graduação",
      targetAmount: 12000,
      currentAmount: 12000,
      achievedDate: "Ago/2024",
      category: "Educação",
      color: "success",
      icon: "school",
    },
    {
      id: 6,
      title: "Novo Notebook",
      description: "Comprar notebook para trabalho",
      targetAmount: 5000,
      currentAmount: 5000,
      achievedDate: "Set/2024",
      category: "Tecnologia",
      color: "success",
      icon: "laptop",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "dark";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Média";
      case "low":
        return "Baixa";
      default:
        return "Normal";
    }
  };

  const renderGoalCard = (goal, isCompleted = false) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const remainingAmount = goal.targetAmount - goal.currentAmount;
    const monthsToDeadline = Math.ceil(remainingAmount / goal.monthlyContribution);

    return (
      <Grid item xs={12} md={6} lg={4} key={goal.id}>
        <Card>
          <MDBox p={3}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <MDBox display="flex" alignItems="center">
                <Icon color={goal.color} sx={{ mr: 1 }}>
                  {goal.icon}
                </Icon>
                <MDTypography variant="h6" fontWeight="medium">
                  {goal.title}
                </MDTypography>
              </MDBox>
              {!isCompleted && (
                <MDBadge
                  badgeContent={getPriorityText(goal.priority)}
                  color={getPriorityColor(goal.priority)}
                  variant="gradient"
                  size="sm"
                />
              )}
            </MDBox>

            <MDTypography variant="caption" color="text" mb={2} display="block">
              {goal.description}
            </MDTypography>

            <MDBox mb={2}>
              <MDBox display="flex" justifyContent="space-between" mb={1}>
                <MDTypography variant="caption" color="text">
                  Meta
                </MDTypography>
                <MDTypography variant="caption" fontWeight="medium">
                  R$ {goal.targetAmount.toLocaleString("pt-BR")}
                </MDTypography>
              </MDBox>
              <MDBox display="flex" justifyContent="space-between" mb={1}>
                <MDTypography variant="caption" color="text">
                  Atual
                </MDTypography>
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  color={isCompleted ? "success" : "info"}
                >
                  R$ {goal.currentAmount.toLocaleString("pt-BR")}
                </MDTypography>
              </MDBox>
              {!isCompleted && (
                <MDBox display="flex" justifyContent="space-between" mb={2}>
                  <MDTypography variant="caption" color="text">
                    Restante
                  </MDTypography>
                  <MDTypography
                    variant="caption"
                    fontWeight="medium"
                    color={remainingAmount >= 0 ? "warning" : "error"}
                  >
                    R$ {remainingAmount.toLocaleString("pt-BR")}
                  </MDTypography>
                </MDBox>
              )}
            </MDBox>

            <MDBox mb={2}>
              <MDBox display="flex" justifyContent="space-between" mb={1}>
                <MDTypography variant="caption" color="text">
                  Progresso: {progress.toFixed(1)}%
                </MDTypography>
                {!isCompleted && (
                  <MDTypography variant="caption" color="text">
                    {monthsToDeadline} meses
                  </MDTypography>
                )}
              </MDBox>
              <LinearProgress
                variant="determinate"
                value={progress > 100 ? 100 : progress}
                color={
                  isCompleted
                    ? "success"
                    : progress >= 100
                    ? "success"
                    : progress >= 80
                    ? "warning"
                    : "info"
                }
                sx={{ height: "8px", borderRadius: "4px" }}
              />
            </MDBox>

            {!isCompleted && (
              <MDBox mb={2}>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="caption" color="text">
                    Contribuição Mensal
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium">
                    R$ {goal.monthlyContribution.toLocaleString("pt-BR")}
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between">
                  <MDTypography variant="caption" color="text">
                    Prazo
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium">
                    {goal.deadline}
                  </MDTypography>
                </MDBox>
              </MDBox>
            )}

            {isCompleted && (
              <MDBox mb={2}>
                <MDBox display="flex" justifyContent="space-between">
                  <MDTypography variant="caption" color="text">
                    Concluído em
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium" color="success">
                    {goal.achievedDate}
                  </MDTypography>
                </MDBox>
              </MDBox>
            )}

            <MDBox display="flex" gap={1}>
              {!isCompleted && (
                <MDButton
                  variant="outlined"
                  color={progress >= 100 ? "success" : "info"}
                  size="small"
                  fullWidth
                >
                  {progress >= 100 ? "Concluído" : "Editar Meta"}
                </MDButton>
              )}
              <MDButton variant="text" color="dark" size="small">
                <Icon>more_vert</Icon>
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          {/* Header */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <MDTypography variant="h4" fontWeight="medium">
                      Metas Financeiras
                    </MDTypography>
                    <MDTypography variant="button" color="text">
                      Defina e acompanhe suas metas financeiras de curto, médio e longo prazo
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDButton variant="gradient" color="info" fullWidth>
                      <Icon>add</Icon>&nbsp;Nova Meta
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Abas de navegação */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={2}>
                <Grid container spacing={1}>
                  <Grid item>
                    <MDButton
                      variant={activeTab === "active" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setActiveTab("active")}
                    >
                      <Icon>flag</Icon>&nbsp;Metas Ativas ({activeGoals.length})
                    </MDButton>
                  </Grid>
                  <Grid item>
                    <MDButton
                      variant={activeTab === "completed" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setActiveTab("completed")}
                    >
                      <Icon>check_circle</Icon>&nbsp;Concluídas ({completedGoals.length})
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Resumo de metas ativas */}
          {activeTab === "active" && (
            <Grid item xs={12}>
              <Card>
                <MDBox p={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                      <MDBox textAlign="center">
                        <MDTypography variant="h4" color="info" fontWeight="medium">
                          {activeGoals.length}
                        </MDTypography>
                        <MDTypography variant="button" color="text">
                          Metas Ativas
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MDBox textAlign="center">
                        <MDTypography variant="h4" color="success" fontWeight="medium">
                          R${" "}
                          {activeGoals
                            .reduce((sum, goal) => sum + goal.currentAmount, 0)
                            .toLocaleString("pt-BR")}
                        </MDTypography>
                        <MDTypography variant="button" color="text">
                          Economizado
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MDBox textAlign="center">
                        <MDTypography variant="h4" color="warning" fontWeight="medium">
                          R${" "}
                          {activeGoals
                            .reduce(
                              (sum, goal) => sum + (goal.targetAmount - goal.currentAmount),
                              0
                            )
                            .toLocaleString("pt-BR")}
                        </MDTypography>
                        <MDTypography variant="button" color="text">
                          Restante
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <MDBox textAlign="center">
                        <MDTypography variant="h4" color="primary" fontWeight="medium">
                          {Math.round(
                            activeGoals.reduce(
                              (sum, goal) => sum + (goal.currentAmount / goal.targetAmount) * 100,
                              0
                            ) / activeGoals.length
                          )}
                          %
                        </MDTypography>
                        <MDTypography variant="button" color="text">
                          Progresso Médio
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          )}

          {/* Lista de metas */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {activeTab === "active"
                ? activeGoals.map((goal) => renderGoalCard(goal, false))
                : completedGoals.map((goal) => renderGoalCard(goal, true))}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Goals;
