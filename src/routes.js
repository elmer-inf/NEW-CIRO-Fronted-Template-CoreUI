import React from 'react';

const Main = React.lazy(() => import('./views/pages/main/Main'));

// Parametrizacion - Evento de riesgo
const AdministracionEventoListar = React.lazy(() => import('./views/administracion/evento-riesgo/Listar'));
const AdministracionEventoRegistrar = React.lazy(() => import('./views/administracion/evento-riesgo/Registrar'));
const AdministracionEventoEditar = React.lazy(() => import('./views/administracion/evento-riesgo/Editar'));

// Parametrizacion - Matriz de riesgo
const AdministracionMatrizRiesgosListar = React.lazy(() => import('./views/administracion/matriz-riesgo/Listar'));
const AdministracionMatrizRiesgosRegistrar = React.lazy(() => import('./views/administracion/matriz-riesgo/Registrar'));
const AdministracionMatrizRiesgosEditar = React.lazy(() => import('./views/administracion/matriz-riesgo/Editar'));

// Parametrizacion - Matriz de oportunidad
const AdministracionMatrizOportunidadListar = React.lazy(() => import('./views/administracion/matriz-oportunidad/Listar'));
const AdministracionMatrizOportunidadRegistrar = React.lazy(() => import('./views/administracion/matriz-oportunidad/Registrar'));
const AdministracionMatrizOportunidadEditar = React.lazy(() => import('./views/administracion/matriz-oportunidad/Editar'));

// Parametrizacion - Seguridad
const AdministracionSeguridadListar = React.lazy(() => import('./views/administracion/seguridad/Listar'));
const AdministracionSeguridadRegistrar = React.lazy(() => import('./views/administracion/seguridad/Registrar'));
const AdministracionSeguridadEditar = React.lazy(() => import('./views/administracion/seguridad/Editar'));

// Modulo de Eventos de riesgo
const EventoRiesgoListar = React.lazy(() => import('./views/eventoRiesgo/Listar'));
const EventoRiesgoRegistrar = React.lazy(() => import('./views/eventoRiesgo/Registrar'));
const EventoRiesgo = React.lazy(() => import('./views/eventoRiesgo/Mostrar'));
const UpdateEventoRiesgo = React.lazy(() => import('./views/eventoRiesgo/Editar'));

// Modulo de Matriz de riesgos
const MatrizRiesgoListar = React.lazy(() => import('./views/matrizRiesgo/Listar'));
const MatrizRiesgoRegistrar = React.lazy(() => import('./views/matrizRiesgo/Registrar'));
const MatrizRiesgoMostrar = React.lazy(() => import('./views/matrizRiesgo/Mostrar'));
const MatrizRiesgoEditar = React.lazy(() => import('./views/matrizRiesgo/Editar'));

// Modulo de Matriz de oporunidades
const MatrizOportunidadListar = React.lazy(() => import('./views/matrizOportunidad/Listar'));
const MatrizOportunidadRegistrar = React.lazy(() => import('./views/matrizOportunidad/Registrar'));
const MatrizOportunidadMostrar = React.lazy(() => import('./views/matrizOportunidad/Mostrar'));
const MatrizOportunidadEditar = React.lazy(() => import('./views/matrizOportunidad/Editar'));

// Modulo de Riesgos en Seguridad
const SeguridadListar = React.lazy(() => import('./views/seguridad/Listar'));
const SeguridadRegistrar = React.lazy(() => import('./views/seguridad/Registrar'));
const SeguridadMostrar = React.lazy(() => import('./views/seguridad/Mostrar'));
const SeguridadControl = React.lazy(() => import('./views/seguridad/Control'));
const SeguridadEditar = React.lazy(() => import('./views/seguridad/Editar'));

// Modulo de Reportes
const ReporteEvento = React.lazy(() => import('./views/reporte/evento/ReporteEvento'));
const ReporteRiesgo = React.lazy(() => import('./views/reporte/riesgo/ReporteRiesgo'));
const ReporteOportunidades = React.lazy(() => import('./views/reporte/oportunidad/ReporteOportunidad'));

// Modulo de Eventos recurrentes Factor persona
const EventoRecurrenteListar = React.lazy(() => import('./views/eventoRecurrente/Listar'));
const EventoRecurrente = React.lazy(() => import('./views/eventoRecurrente/Mostrar'));
const UpdateEventoRecurrente = React.lazy(() => import('./views/eventoRecurrente/Editar'));

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/main', name: '', component: Main },
  { path: '/eventoRiesgo/Mostrar/:id', name: 'Evento de Riesgo', component: EventoRiesgo },
  { path: '/matrizRiesgo/Mostrar/:id', name: 'Matriz de Riesgo', component: MatrizRiesgoMostrar },
  { path: '/matrizOportunidad/Mostrar/:id', name: 'Matriz de oportunidad', component: MatrizOportunidadMostrar },
  { path: '/seguridad/Mostrar/:id', name: 'Riesgo en Seguridad', component: SeguridadMostrar },
  { path: '/eventoRecurrente/Mostrar/:id', name: 'Evento recurrente - Factor persona', component: EventoRecurrente },

  // Modulo de Parametrizacion
  { path: '/administracion', name: 'Administración', component: AdministracionEventoListar, exact: true },
  { path: '/administracion/evento-riesgo/Listar', name: 'Parámetros de Eventos de riesgo', component: AdministracionEventoListar },
  { path: '/administracion/evento-riesgo/Registrar', name: 'Registrar parámetro de Evento de Riesgo', component: AdministracionEventoRegistrar },
  { path: '/administracion/evento-riesgo/Editar/:id', name: 'Editar parámetro de Evento de Riesgo', component: AdministracionEventoEditar },

  { path: '/administracion/matriz-riesgo/Listar', name: 'Parámetros de Matriz de riesgo', component: AdministracionMatrizRiesgosListar },
  { path: '/administracion/matriz-riesgo/Registrar', name: 'Registrar parámetro de Matriz de riesgo', component: AdministracionMatrizRiesgosRegistrar },
  { path: '/administracion/matriz-riesgo/Editar/:id', name: 'Editar parámetro de Matriz de riesgo', component: AdministracionMatrizRiesgosEditar },

  { path: '/administracion/matriz-oportunidad/Listar', name: 'Parámetros de Matriz de oportunidades', component: AdministracionMatrizOportunidadListar },
  { path: '/administracion/matriz-oportunidad/Registrar', name: 'Registrar parámetro de Matriz de oportunidad', component: AdministracionMatrizOportunidadRegistrar },
  { path: '/administracion/matriz-oportunidad/Editar/:id', name: 'Editar parámetro de Matriz de oportunidad', component: AdministracionMatrizOportunidadEditar },

  { path: '/administracion/seguridad/Listar', name: 'Parámetros de Seguridad', component: AdministracionSeguridadListar },
  { path: '/administracion/seguridad/Registrar', name: 'Registrar parámetro de Seguridad', component: AdministracionSeguridadRegistrar },
  { path: '/administracion/seguridad/Editar/:id', name: 'Editar parámetro de Seguridad', component: AdministracionSeguridadEditar },

  // Modulo de Eventos de riesgo
  { path: '/eventoRiesgo', name: 'Eventos de Riesgo', component: EventoRiesgoListar, exact: true },
  { path: '/eventoRiesgo/Listar', name: 'Eventos de riesgo', component: EventoRiesgoListar },
  { path: '/eventoRiesgo/Registrar', name: 'Registrar Evento de Riesgo', component: EventoRiesgoRegistrar },
  { path: '/eventoRiesgo/Editar/:id', name: 'Editar Evento de Riesgo', component: UpdateEventoRiesgo },

  // Modulo de Matriz de riesgo
  { path: '/matrizRiesgo', name: 'Matriz de Riesgo', component: MatrizRiesgoListar, exact: true },
  { path: '/matrizRiesgo/Listar', name: 'Matriz de riesgos', component: MatrizRiesgoListar },
  { path: '/matrizRiesgo/Registrar', name: 'Registrar Matriz de Riesgo', component: MatrizRiesgoRegistrar },
  { path: '/matrizRiesgo/editar/:id', name: 'Editar Matriz de Riesgo', component: MatrizRiesgoEditar },

  // Modulo de  Matriz de oportunidad
  { path: '/matrizOportunidad', name: 'Matriz de oportunidad', component: MatrizOportunidadListar, exact: true },
  { path: '/matrizOportunidad/Listar', name: 'Matriz de oportunidades', component: MatrizOportunidadListar },
  { path: '/matrizOportunidad/Registrar', name: 'Registrar Matriz de oportunidad', component: MatrizOportunidadRegistrar },
  { path: '/matrizOportunidad/editar/:id', name: 'Editar Matriz de oportunidad', component: MatrizOportunidadEditar },

  // Modulo de Riesgos en Seguridad
  { path: '/seguridad', name: 'Riesgo en Seguridad', component: SeguridadListar, exact: true },
  { path: '/seguridad/Listar', name: 'Seguridad de la información', component: SeguridadListar },
  { path: '/seguridad/Registrar', name: 'Registrar Riesgo en Seguridad', component: SeguridadRegistrar },
  { path: '/seguridad/Control', name: 'Control de Riesgo en Seguridad', component: SeguridadControl },
  { path: '/seguridad/Editar/:id', name: 'Editar Riesgo en Seguridad', component: SeguridadEditar },

  // Modulo de Reportes
  { path: '/reporte', name: 'Reportes', component: ReporteEvento, exact: true },
  { path: '/reporte/evento-riesgo', name: 'Reportes de Eventos de Riesgo', component: ReporteEvento }, 
  { path: '/reporte/matriz-riesgo', name: 'Reportes de Matriz de Riesgos', component: ReporteRiesgo },
  { path: '/reporte/matriz-oportunidad', name: 'Reportes de Matriz de Oportunidades', component: ReporteOportunidades },

  // Modulo de Eventos recurrentes Factor persona
  { path: '/eventoRecurrente', name: 'Eventos recurrentes', component: EventoRecurrenteListar, exact: true },
  { path: '/eventoRecurrente/listar', name: 'Eventos recurrentes - Factor persona', component: EventoRecurrenteListar },
  { path: '/eventoRecurrente/editar/:id', name: 'Editar Eventos recurrentes - Factor persona', component: UpdateEventoRecurrente },
];

export default routes;
