/**
=========================================================
* Finance Controller - Página de Transações
=========================================================

* Página para visualizar e gerenciar todas as transações financeiras
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
const transactionsData = {
  columns: [
    { Header: "Data", accessor: "date", width: "15%" },
    { Header: "Descrição", accessor: "description", width: "30%" },
    { Header: "Categoria", accessor: "category", width: "20%" },
    { Header: "Conta", accessor: "account", width: "15%" },
    { Header: "Valor", accessor: "amount", width: "15%" },
    { Header: "Ações", accessor: "actions", width: "5%" },
  ],
  rows: [
    {
      date: "15/11/2024",
      description: "Supermercado Extra",
      category: "Alimentação",
      account: "Cartão Nubank",
      amount: (
        <MDTypography variant="caption" color="error" fontWeight="medium">
          - R$ 245,80
        </MDTypography>
      ),
      actions: (
        <MDButton variant="text" color="info" size="small">
          <Icon>edit</Icon>
        </MDButton>
      ),
    },
    {
      date: "14/11/2024",
      description: "Salário Mensal",
      category: "Renda",
      account: "Conta Corrente",
      amount: (
        <MDTypography variant="caption" color="success" fontWeight="medium">
          + R$ 5.500,00
        </MDTypography>
      ),
      actions: (
        <MDButton variant="text" color="info" size="small">
          <Icon>edit</Icon>
        </MDButton>
      ),
    },
    {
      date: "13/11/2024",
      description: "Netflix Brasil",
      category: "Entretenimento",
      account: "Cartão Nubank",
      amount: (
        <MDTypography variant="caption" color="error" fontWeight="medium">
          - R$ 45,90
        </MDTypography>
      ),
      actions: (
        <MDButton variant="text" color="info" size="small">
          <Icon>edit</Icon>
        </MDButton>
      ),
    },
    {
      date: "12/11/2024",
      description: "Posto Shell",
      category: "Transporte",
      account: "Cartão Nubank",
      amount: (
        <MDTypography variant="caption" color="error" fontWeight="medium">
          - R$ 180,00
        </MDTypography>
      ),
      actions: (
        <MDButton variant="text" color="info" size="small">
          <Icon>edit</Icon>
        </MDButton>
      ),
    },
    {
      date: "11/11/2024",
      description: "Freelance - Design",
      category: "Renda Extra",
      account: "Conta Corrente",
      amount: (
        <MDTypography variant="caption" color="success" fontWeight="medium">
          + R$ 1.200,00
        </MDTypography>
      ),
      actions: (
        <MDButton variant="text" color="info" size="small">
          <Icon>edit</Icon>
        </MDButton>
      ),
    },
  ],
};

function Transactions() {
  const [menu, setMenu] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAccount, setFilterAccount] = useState("");

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Exportar CSV</MenuItem>
      <MenuItem onClick={closeMenu}>Exportar PDF</MenuItem>
      <MenuItem onClick={closeMenu}>Imprimir</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          {/* Header com filtros */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Transações
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MDInput
                      label="Filtrar por categoria"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <MDInput
                      label="Filtrar por conta"
                      value={filterAccount}
                      onChange={(e) => setFilterAccount(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <MDButton variant="gradient" color="info" fullWidth>
                      <Icon>add</Icon>&nbsp;Nova Transação
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Tabela de transações */}
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3} px={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Histórico de Transações
                  </MDTypography>
                  <MDButton variant="text" color="dark" onClick={openMenu}>
                    <Icon>more_vert</Icon>
                  </MDButton>
                  {renderMenu}
                </MDBox>
              </MDBox>
              <MDBox p={3}>
                <DataTable
                  table={transactionsData}
                  entriesPerPage={false}
                  canSearch
                  showTotalEntries={false}
                  pagination={{ variant: "gradient", color: "info" }}
                />
              </MDBox>
            </Card>
          </Grid>

          {/* Resumo por categoria */}
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Despesas por Categoria
                </MDTypography>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="button" color="text">
                    Alimentação
                  </MDTypography>
                  <MDTypography variant="button" color="error">
                    R$ 1.245,80
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="button" color="text">
                    Transporte
                  </MDTypography>
                  <MDTypography variant="button" color="error">
                    R$ 580,00
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="button" color="text">
                    Entretenimento
                  </MDTypography>
                  <MDTypography variant="button" color="error">
                    R$ 245,90
                  </MDTypography>
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  pt={2}
                  borderTop={1}
                  borderColor="grey.300"
                >
                  <MDTypography variant="button" fontWeight="medium">
                    Total
                  </MDTypography>
                  <MDTypography variant="button" fontWeight="medium" color="error">
                    R$ 2.071,70
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Contas bancárias */}
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={2}>
                  Saldo das Contas
                </MDTypography>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="button" color="text">
                    Conta Corrente
                  </MDTypography>
                  <MDTypography variant="button" color="success">
                    R$ 8.750,00
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="button" color="text">
                    Poupança
                  </MDTypography>
                  <MDTypography variant="button" color="success">
                    R$ 15.320,00
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" justifyContent="space-between" mb={1}>
                  <MDTypography variant="button" color="text">
                    Cartão Nubank
                  </MDTypography>
                  <MDTypography variant="button" color="warning">
                    R$ 2.150,00
                  </MDTypography>
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  mt={2}
                  pt={2}
                  borderTop={1}
                  borderColor="grey.300"
                >
                  <MDTypography variant="button" fontWeight="medium">
                    Total
                  </MDTypography>
                  <MDTypography variant="button" fontWeight="medium" color="success">
                    R$ 21.920,00
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Transactions;
