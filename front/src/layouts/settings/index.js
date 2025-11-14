/**
=========================================================
* Finance Controller - Página de Configurações
=========================================================

* Página para configurar preferências e configurações do sistema
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
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

function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    budgetAlerts: true,
    goalReminders: true,
    billReminders: true,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    currency: "BRL",
    language: "pt-BR",
    dateFormat: "DD/MM/YYYY",
    weekStart: "monday",
  });

  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    birthDate: "15/03/1990",
  });

  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handlePreferenceChange = (type, value) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const categories = [
    { name: "Alimentação", color: "#4CAF50", budget: 1200 },
    { name: "Transporte", color: "#2196F3", budget: 800 },
    { name: "Moradia", color: "#FF9800", budget: 2500 },
    { name: "Entretenimento", color: "#9C27B0", budget: 600 },
    { name: "Saúde", color: "#F44336", budget: 400 },
    { name: "Educação", color: "#607D8B", budget: 800 },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid container spacing={6}>
          {/* Header */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" fontWeight="medium">
                  Configurações
                </MDTypography>
                <MDTypography variant="button" color="text">
                  Personalize sua experiência no Finance Controller
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>

          {/* Perfil do Usuário */}
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Perfil do Usuário
                </MDTypography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MDInput
                      label="Nome Completo"
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="E-mail"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="Telefone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="Data de Nascimento"
                      value={profile.birthDate}
                      onChange={(e) => handleProfileChange("birthDate", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton variant="gradient" color="info" fullWidth>
                      Atualizar Perfil
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Preferências */}
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Preferências
                </MDTypography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center">
                      <MDTypography variant="button" color="text">
                        Modo Escuro
                      </MDTypography>
                      <Switch
                        checked={preferences.darkMode}
                        onChange={(e) => handlePreferenceChange("darkMode", e.target.checked)}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Moeda"
                      value={preferences.currency}
                      onChange={(e) => handlePreferenceChange("currency", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Idioma"
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange("language", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Formato de Data"
                      value={preferences.dateFormat}
                      onChange={(e) => handlePreferenceChange("dateFormat", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Início da Semana"
                      value={preferences.weekStart}
                      onChange={(e) => handlePreferenceChange("weekStart", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Notificações */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Notificações
                </MDTypography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <MDTypography variant="button" color="text">
                        Notificações por E-mail
                      </MDTypography>
                      <Switch
                        checked={notifications.email}
                        onChange={() => handleNotificationChange("email")}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <MDTypography variant="button" color="text">
                        Notificações Push
                      </MDTypography>
                      <Switch
                        checked={notifications.push}
                        onChange={() => handleNotificationChange("push")}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <MDTypography variant="button" color="text">
                        Alertas de Orçamento
                      </MDTypography>
                      <Switch
                        checked={notifications.budgetAlerts}
                        onChange={() => handleNotificationChange("budgetAlerts")}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <MDTypography variant="button" color="text">
                        Lembretes de Metas
                      </MDTypography>
                      <Switch
                        checked={notifications.goalReminders}
                        onChange={() => handleNotificationChange("goalReminders")}
                      />
                    </MDBox>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center">
                      <MDTypography variant="button" color="text">
                        Lembretes de Contas
                      </MDTypography>
                      <Switch
                        checked={notifications.billReminders}
                        onChange={() => handleNotificationChange("billReminders")}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Categorias Personalizadas */}
          <Grid item xs={12}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Categorias de Despesa
                  </MDTypography>
                  <MDButton variant="gradient" color="info" size="small">
                    <Icon>add</Icon>&nbsp;Nova Categoria
                  </MDButton>
                </MDBox>

                <Grid container spacing={2}>
                  {categories.map((category, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                      <MDBox
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p={2}
                        border={1}
                        borderColor="grey.300"
                        borderRadius="md"
                      >
                        <MDBox display="flex" alignItems="center">
                          <MDBox
                            width={20}
                            height={20}
                            borderRadius="50%"
                            bgColor={category.color}
                            mr={2}
                          />
                          <MDBox>
                            <MDTypography variant="button" fontWeight="medium">
                              {category.name}
                            </MDTypography>
                            <MDTypography variant="caption" color="text" display="block">
                              Orçamento: R$ {category.budget.toLocaleString("pt-BR")}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                        <MDBox display="flex" gap={1}>
                          <MDButton variant="text" color="info" size="small">
                            <Icon>edit</Icon>
                          </MDButton>
                          <MDButton variant="text" color="error" size="small">
                            <Icon>delete</Icon>
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Segurança */}
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Segurança
                </MDTypography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDButton variant="outlined" color="info" fullWidth>
                      <Icon>lock</Icon>&nbsp;Alterar Senha
                    </MDButton>
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton variant="outlined" color="info" fullWidth>
                      <Icon>security</Icon>&nbsp;Autenticação em Duas Etapas
                    </MDButton>
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton variant="outlined" color="info" fullWidth>
                      <Icon>history</Icon>&nbsp;Histórico de Acesso
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>

          {/* Exportar Dados */}
          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium" mb={3}>
                  Exportar Dados
                </MDTypography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDButton variant="outlined" color="success" fullWidth>
                      <Icon>download</Icon>&nbsp;Exportar CSV
                    </MDButton>
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton variant="outlined" color="success" fullWidth>
                      <Icon>picture_as_pdf</Icon>&nbsp;Exportar PDF
                    </MDButton>
                  </Grid>
                  <Grid item xs={12}>
                    <MDButton variant="outlined" color="error" fullWidth>
                      <Icon>delete_forever</Icon>&nbsp;Excluir Conta
                    </MDButton>
                  </Grid>
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

export default Settings;
