/**
=========================================================
* Finance Controller - Página de Contas
=========================================================

* Página para gerenciar contas bancárias e cartões de crédito
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Accounts() {
  const [activeTab, setActiveTab] = useState("accounts");

  const accountsData = [
    {
      name: "Conta Corrente - Banco do Brasil",
      type: "Conta Corrente",
      balance: "R$ 8.750,00",
      accountNumber: "12345-6",
      agency: "001",
      color: "success",
      icon: "account_balance",
    },
    {
      name: "Poupança - Banco do Brasil",
      type: "Poupança",
      balance: "R$ 15.320,00",
      accountNumber: "65432-1",
      agency: "001",
      color: "info",
      icon: "savings",
    },
    {
      name: "NuConta - Nubank",
      type: "Conta Digital",
      balance: "R$ 3.200,00",
      accountNumber: "0001-2",
      agency: "0001",
      color: "primary",
      icon: "phone_android",
    },
  ];

  const cardsData = [
    {
      name: "Cartão Nubank",
      type: "Cartão de Crédito",
      limit: "R$ 5.000,00",
      used: "R$ 2.150,00",
      available: "R$ 2.850,00",
      dueDate: "15/12/2024",
      color: "warning",
      icon: "credit_card",
      usage: 43,
    },
    {
      name: "Cartão BB",
      type: "Cartão de Crédito",
      limit: "R$ 3.000,00",
      used: "R$ 890,00",
      available: "R$ 2.110,00",
      dueDate: "20/12/2024",
      color: "success",
      icon: "credit_card",
      usage: 30,
    },
    {
      name: "Cartão Inter",
      type: "Cartão de Crédito",
      limit: "R$ 4.000,00",
      used: "R$ 1.200,00",
      available: "R$ 2.800,00",
      dueDate: "25/12/2024",
      color: "info",
      icon: "credit_card",
      usage: 30,
    },
  ];

  const renderAccounts = () => (
    <Grid container spacing={3}>
      {accountsData.map((account, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <Card>
            <MDBox p={3}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <MDTypography variant="h6" fontWeight="medium">
                  {account.name}
                </MDTypography>
                <Icon color={account.color}>{account.icon}</Icon>
              </MDBox>
              <MDTypography variant="button" color="text" mb={1} display="block">
                {account.type}
              </MDTypography>
              <MDTypography variant="h4" fontWeight="medium" color={account.color} mb={2}>
                {account.balance}
              </MDTypography>
              <Divider />
              <MDBox mt={2}>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="caption" color="text">
                    Agência
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium">
                    {account.agency}
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between">
                  <MDTypography variant="caption" color="text">
                    Conta
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium">
                    {account.accountNumber}
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox mt={2}>
                <MDButton variant="outlined" color={account.color} size="small" fullWidth>
                  Ver Extrato
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderCards = () => (
    <Grid container spacing={3}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <Card>
            <MDBox p={3}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <MDTypography variant="h6" fontWeight="medium">
                  {card.name}
                </MDTypography>
                <Icon color={card.color}>{card.icon}</Icon>
              </MDBox>
              <MDTypography variant="button" color="text" mb={1} display="block">
                {card.type}
              </MDTypography>

              <MDBox mb={2}>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="caption" color="text">
                    Limite Total
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium">
                    {card.limit}
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="caption" color="text">
                    Utilizado
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium" color={card.color}>
                    {card.used}
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="caption" color="text">
                    Disponível
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium" color="success">
                    {card.available}
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between">
                  <MDTypography variant="caption" color="text">
                    Vencimento
                  </MDTypography>
                  <MDTypography variant="caption" fontWeight="medium">
                    {card.dueDate}
                  </MDTypography>
                </MDBox>
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="caption" color="text" mb={1} display="block">
                  Uso do Limite: {card.usage}%
                </MDTypography>
                <MDBox width="100%" bgColor="grey.200" borderRadius="md" height="8px">
                  <MDBox
                    bgColor={card.color}
                    borderRadius="md"
                    height="8px"
                    width={`${card.usage}%`}
                  />
                </MDBox>
              </MDBox>

              <MDBox display="flex" gap={1}>
                <MDButton variant="outlined" color={card.color} size="small" fullWidth>
                  Ver Fatura
                </MDButton>
                <MDButton variant="text" color={card.color} size="small">
                  <Icon>more_vert</Icon>
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          {/* Header com abas */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <MDTypography variant="h4" fontWeight="medium">
                      Gerenciamento de Contas
                    </MDTypography>
                    <MDTypography variant="button" color="text">
                      Visualize e gerencie suas contas bancárias e cartões de crédito
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDButton variant="gradient" color="info" fullWidth>
                      <Icon>add</Icon>&nbsp;Adicionar Conta
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
                      variant={activeTab === "accounts" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setActiveTab("accounts")}
                    >
                      <Icon>account_balance</Icon>&nbsp;Contas
                    </MDButton>
                  </Grid>
                  <Grid item>
                    <MDButton
                      variant={activeTab === "cards" ? "gradient" : "outlined"}
                      color="info"
                      onClick={() => setActiveTab("cards")}
                    >
                      <Icon>credit_card</Icon>&nbsp;Cartões
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Conteúdo das abas */}
          <Grid item xs={12}>
            {activeTab === "accounts" ? renderAccounts() : renderCards()}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Accounts;
