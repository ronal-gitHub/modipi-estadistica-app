<template>
  <div>
    <div class="flex xs11 lg12" style="padding-left: 10px;">
      <va-card class="fill-height" style="overflow-x: auto;">
       
        <div class="flex xs12 mt-3">
          <div class="row align--center">
            <div class="flex xs12 md1"></div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('DEPARTAMENTO')"
                v-model="searchContent01"
                multiple
                 :options="allowedCitiesList"
                @input="search01"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('MUNICIPIO')"
                v-model="searchContent02"
                multiple
                :options="allowedCitiesList1"
                @input="search02"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('GRUPO ETAREO')"
                v-model="searchContent03"
                multiple
                :options="allowedCitiesList2"
                @input="search03"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('EDAD DESDE')"
                v-model="searchContent04"
                multiple
                :options="allowedCitiesList3"
                @input="search04"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('EDAD HASTA')"
                v-model="searchContent05"
                multiple
               :options="allowedCitiesList4"
                @input="search05"
              />
            </div>
            <div class="flex xs12 md1"></div>
          </div>
          <div class="row align--center">
            <div class="flex xs12 md1"></div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('GENERO')"
                v-model="searchContent01"
                multiple
                 :options="allowedCitiesList5"
                @input="search01"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('RIESGO')"
                v-model="searchContent02"
                multiple
                :options="allowedCitiesList6"
                @input="search02"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('PERIODO TEIMPO')"
                v-model="searchContent03"
                multiple
                :options="options03"
                @input="search03"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('FECHA DESDE')"
                v-model="searchContent04"
                multiple
                :options="options04"
                @input="search04"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('FECHA HASTA')"
                v-model="searchContent05"
                multiple
                :options="options05"
                @input="search05"
              />
            </div>
            <div class="flex xs12 md1"></div>
          </div>
          <div class="row align--center">
            <div class="flex xs12 md1"></div>
            <div class="flex xs12 md2">
              <va-select
                class="select-margin"
                :label="$t('COMPONENTE')"
                v-model="searchContent01"
                multiple
                :options="options01"
                @input="search01"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('DIMIENSION')"
                v-model="searchContent02"
                multiple
                :options="options02"
                @input="search02"
              />
            </div>
            <div class="flex xs12 md6">
              <va-select
                :label="$t('SUB-DIMIENSION')"
                v-model="searchContent03"
                multiple
                :options="options03"
                @input="search03"
              />
            </div>
            <div class="flex xs12 md1"></div>
          </div>
          <div class="row align--center">
            <div class="flex xs12 md1"></div>
            <div class="flex xs12 md8">
              <va-select
                :label="$t('INDICADOR')"
                v-model="searchContent01"
                multiple
                :options="options01"
                @input="search01"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('ESTADO')"
                v-model="searchContent05"
                multiple
                :options="options05"
                @input="search05"
              />
            </div>
            <div class="flex xs12 md1"></div>
          </div>
          <div class="row align--center">
            <div class="flex xs12 md1"></div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Rural_Urbano')"
                v-model="searchContent01"
                multiple
                :options="options01"
                @input="search01"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Es migrante')"
                v-model="searchContent02"
                multiple
                :options="options02"
                @input="search02"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Discapacidad')"
                v-model="searchContent03"
                multiple
                :options="options03"
                @input="search03"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Motivo de Trabajo')"
                v-model="searchContent04"
                multiple
                :options="options04"
                @input="search04"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Aportes AFP')"
                v-model="searchContent05"
                multiple
                :options="options05"
                @input="search05"
              />
            </div>
            <div class="flex xs12 md1"></div>
          </div>
          <div class="row align--center">
            <div class="flex xs12 md1"></div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Cert Nacimiernto')"
                v-model="searchContent01"
                multiple
                :options="options01"
                @input="search01"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Cedula Identid')"
                v-model="searchContent02"
                multiple
                :options="options02"
                @input="search02"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Poblacion-etnia')"
                v-model="searchContent03"
                multiple
                :options="options03"
                @input="search03"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Seguro Medico')"
                v-model="searchContent04"
                multiple
                :options="options04"
                @input="search04"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('Derecho Vacacio')"
                v-model="searchContent05"
                multiple
                :options="options05"
                @input="search05"
              />
            </div>
            <div class="flex xs12 md1"></div>
          </div>
          <div class="row mx-5 px-5">
            <div class="flex xs12 md12 lg12 mt-3 pr-4" style="text-align: end;">
              <va-button icon="fa fa-refresh" @click="refresh()" style="background-color: #105544;"> REPORTE </va-button>
              <va-button icon="fa fa-download" @click="exportExcel()"> EXCEL</va-button>
              <va-button icon="fa fa-download" @click="exportPDF()"> PDF</va-button>
            </div>
          </div>
          <div id="chart-canvas" class="row mb-5">
            <div class="flex md1 xs12"></div>
            <div class="flex md7 xs12">
              <va-card
                class="chart-widget"
                :title="$t('NÚMERO DE VIVENDAS POR TIPO DE VIVIENDA, SEGÚN  DEPARTAMENTO, PROVINCIA Y MUNICIPIO, CNPV 2012..')"
              >
                <va-chart :data="verticalBarChartData" type="vertical-bar"/>
              </va-card>
            </div>
            <div class="flex md3 xs12 d-flex align-items--center">
              <va-card
                class="chart-widget"
                :title="$t('')"
                style="display: flex; align-items: center;"
              >
                <va-chart :data="pieChartData" :options="pieOptions" type="pie"/>
              </va-card>
            </div>
            <div class="flex md1 xs12"></div>
          </div>

          <div class="table-title m-0 p-0">RESUMEN</div>
          <va-data-table
            id="tableheader"
            ref="article"
            :fields="fields"
            :data="tableData"
            :loading="loading"
            @row-clicked="showUser"
            clickable
            api-mode
            thead-class="greenColor"
          >
            <template slot="DEPARTAMENTO" slot-scope="props">
              {{ props.rowData.dapartamento }}
            </template>
            <template slot="Total" slot-scope="props">
              <div style="text-align: center;">{{ props.rowData.total }}</div>
            </template>
            <template slot="Vivienda Particular" slot-scope="props">
              <div style="text-align: center;">{{ props.rowData.particular }}</div>
            </template>
            <template slot="Vivienda Colectiva" slot-scope="props">
              <div style="text-align: center;">{{ props.rowData.colectiva }}</div>
            </template>
            <template slot="Transeuntes" slot-scope="props">
              <div style="text-align: center;">{{ props.rowData.transeuntes }}</div>
            </template>
          </va-data-table>
        </div>
        <va-modal
          v-model="addModal"
          title=" NEW DATA "
          okText=" Create "
          @ok="createData"
          :cancelText=" $t('Cancel') "
          noOutsideDismiss
          noEscDismiss
        >
         
        </va-modal>
        <va-modal
          v-model="removeModal"
          cancelClass="none"
          okText="Sure"
          @ok="deleteData"
          message="Are you sure to remove this data for this system?"
          noOutsideDismiss
          noEscDismiss
        />
        <va-modal
          v-model="verifyModal"
          okText=" Aceptar "
          @ok="verifyText"
          noOutsideDismiss
          noEscDismiss
        >
          <div style="text-align: center;">
            <va-icon name="ion-ios-close-circle-outline" slot="prepend" style="font-size: 70px;"/>
          </div>
          <p style="text-align: center; font-size: 36px; font-weight: bold;">Verifique los datos</p>
          <div class="row">
            <div class="col pl-3 pr-3">
              <div class="flex lg12">
                <p>
                  Debe introducir uno de los sigulentes criterios:<br>
                  1. Numero de documento<br>
                  2. Nombres y Apellidos<br>
                  3. O ambas opciones combinadas, mas fecha de nacimiento(si tuviera).
                </p>
              </div>
            </div>
          </div>
        </va-modal>
        <va-modal
          v-model="invalidModal"
          okText=" Aceptar "
          @ok="verifyText"
          noOutsideDismiss
          noEscDismiss
        >
          <div style="text-align: center;">
            <va-icon name="ion-ios-close-circle-outline" slot="prepend" style="font-size: 70px;"/>
          </div>
          <p style="text-align: center; font-size: 36px; font-weight: bold;">No se encontaron resultados</p>
          <p style="text-align: center;">
            Verifique los criterios de busqueda.
          </p>
        </va-modal>
      </va-card>
    </div>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import moment from 'moment';
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from "html2canvas";
import { jsontoexcel } from "vue-table-to-excel";
import * as XLSX from 'xlsx/xlsx.mjs';
const ExcelJS = require('exceljs');
import config from "@/config";
import VaChart from '../statistics/charts/va-charts/VaChart';
import { getPieChartData } from '../../data/charts/PieChartData';
import { getVerticalBarChartData } from '../../data/charts/VerticalBarChartData';
axios.defaults.baseURL = config.API_URL;

export default {
  data() {
    return {

      pieChartData: getPieChartData(this.$themes),
      verticalBarChartData: getVerticalBarChartData(this.$themes),
      pieOptions: {
        responsive: true, 
        maintainAspectRatio: false,
      },

      tableData: [{
        dapartamento: "Chuquisaca..",
        total: 179578,
        particular: 176450,
        colectiva: 2277,
        transeuntes: 851
      },
      {
        dapartamento: "La Paz",
        total: 940948,
        particular: 930457,
        colectiva: 7197,
        transeuntes: 3294
      },
      {
        dapartamento: "Cochabamba",
        total: 179578,
        particular: 176450,
        colectiva: 2277,
        transeuntes: 851
      },
      {
        dapartamento: "Oruro",
        total: 179578,
        particular: 176450,
        colectiva: 2277,
        transeuntes: 851
      },
      {
        dapartamento: "Potosí",
        total: 179578,
        particular: 176450,
        colectiva: 2277,
        transeuntes: 851
      },
      {
        dapartamento: "Tarija",
        total: 179578,
        particular: 176450,
        colectiva: 2277,
        transeuntes: 851
      },
      {
        dapartamento: "Santa Cruz",
        total: 179578,
        particular: 176450,
        colectiva: 2277,
        transeuntes: 851
      },
      {
        dapartamento: "Beni",
        total: 179578,
        particular: 176450,
        colectiva: 2277,
        transeuntes: 851
      },
      {
        dapartamento: "Pando",
        total: 179578,
        particular: 176450,
        colectiva: 2277,
        transeuntes: 851
      }],

      addModal: false,
      verifyModal: false,
      invalidModal: false,
      
      searchContent01: [],
      searchContent02: [],
      searchContent03: [],
      searchContent04: [],
      searchContent05: [],
      searchContent06: [],
      searchContent07: [],
      searchContent08: [],
      searchContent09: [],
      searchContent10: [],
      searchContent11: [],
      searchContent12: [],

      options01: [],
      options02: [],
      options03: [],
      options04: [],
      options05: [],
      options06: [],
      options07: [],
      options08: [],
      options09: [],
      options10: [],
      options11: [],
      options12: [],

      searchGenContent01: '',
      searchGenContent02: '',
      searchGenContent03: '',
      searchGenContent04: '',
      gestion: 'TODOS',

      loading: false,

      logs: [],
      dateRange: [],
      datePickerRange: '',
      refreshDt: '',
      refreshBt: false,
      api_url: config.API_URL,
      api_key: config.api_key,

      products: [],
      searchedProducts: [],
      reqData: [],
      reqDel: [],
      values01: '',
      values02: '',
      values03: '',
      values04: '',
      values05: '',
      values06: '',
      values07: '',
      values08: '',
      values09: '',
      values10: '',
      values11: '',
      values12: '',

      allowedCitiesList: [
"Chuquisaca	",	
"La Paz		",
"Cochabamba	",	
"Oruro		",
"Potosí		",
"Tarija		",
"Santa Cruz	",	
"Beni		",
"Pando		"
      ],
    allowedCitiesList1: [
"Oropeza     ","Sucre       ","Yotala      ","Poroma      ","Azurduy     ","Azurduy     ","Tarvita     ","Zudañez     ","Zudañez     ","Presto      ","Mojocoya    ","Icla        ","Tomina      ","Padilla     ","Tomina      ","Sopachuy    ","Villa Alcalá","El Villar   ",
      ],
     allowedCitiesList2: [
"de 0 a 1 años    ",
"de 1 a 2 años   ",
"de 2 a 3 años    ",
"de 3 a 4 años   ( edad >= 3 años y edad < 4 )    ",
"de 4 a 5 años   ( edad >= 4 años y edad < 5 )    ",
"de 0 a 5 años   ( edad >= 0 años y edad < 5 )    ",
"de 5 a 12 años  ( edad >= 5 años y edad < 12 )   ",
"de 12 a 18 años ( edad >= 12 años y edad < 18 )  ",
"de 18 a 60 años ( edad >= 18 años y edad < 60 )  ",
"de 60 a 120 años ( edad >= 60 años y edad < 120 )"
      ], 
  allowedCitiesList3: [
       "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015",
        "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006",
        "2005", "2004", "2003", "2002", "2001", "2000"
      ],    
       allowedCitiesList4: [
       "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015",
        "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006",
        "2005", "2004", "2003", "2002", "2001", "2000"
      ],
    allowedCitiesList5: [
"Masculino     ","Femenino   ","Ambos"
      ], 
          allowedCitiesList6: [
"Alto     ","Bajo   "
      ], 
      ind: null,
      removeModal: false,

      json: {
        head: [
                "DEPARTAMENTO", "TOTAL", "VIVIENDA PARTICULAR", "VIVIENDA COLECTIVA", "TRANSEUNTES"
              ],
        fileName: "ReportData.xls"
      },
      doc: new jsPDF('p', 'mm', 'b1'),

      searchDateTime: ''
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "__slot:DEPARTAMENTO",
          title: "DEPARTAMENTO",
          width: "40%",
        },
        {
          name: "__slot:Total",
          title: "Total",
          width: "15%",
        },
        {
          name: "__slot:Vivienda Particular",
          title: "Vivienda Particular",
          width: "15%",
        },
        {
          name: "__slot:Vivienda Colectiva",
          title: "Vivienda Colectiva",
          width: "15%",
        },
        {
          name: "__slot:Transeuntes",
          title: "Transeuntes",
          width: "15%",
        },
      ];
    },
  },
  mounted() {
    this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    setInterval(() => this.getOptions(), 3000);
  },
  watch: {
    addModal: function(params) {
      this.reqData = []
      this.values01 = ''
      this.values02 = ''
      this.values03 = ''
      this.values04 = ''
      this.values05 = ''
      this.values06 = ''
      this.values07 = ''
      this.values08 = ''
      this.values09 = ''
      this.values10 = ''
      this.values11 = ''
      this.values12 = ''
    },
    removeModal: function(params) {
      this.reqDel = []
    },

    searchContent01: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.fechaNac == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent02: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.nombres_apellidos == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent03: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => moment(product.fecha_nac).format("DD/MM/YYYY").toString() == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent04: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.numero_doc == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent05: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.tipo_doc == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent06: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.pais_nac == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent07: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.serie == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent08: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => moment(product.fecha_emi).format("DD/MM/YYYY HH:mm:ss").toString() == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent09: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => moment(product.fecha_ven).format("DD/MM/YYYY HH:mm:ss").toString() == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent10: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.lugar_emi == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent11: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.estado == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
    searchContent12: function (val) {
      this.searchedProducts = this.products.filter(product => {
        if(val.filter(item => product.observacion == item).length)
          return true;
        return false;
      })
      if(!val.length) this.searchedProducts = this.products
      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },
  },
  methods: {
    isValidateDate(dateStr) {
      const s = dateStr.split('/');
      const d = new Date(+s[2], s[1]-1, +s[0]);
      if (Object.prototype.toString.call(d) === "[object Date]") {
          if (!isNaN(d.getTime()) && d.getDate() == s[0] && 
              d.getMonth() == (s[1] - 1)) {
              return true;
          }
      }
      return false;
    },
    isValidateNumber(data) {
      if(data == parseInt(data))
        return true;
      return false;
    },
    getData() {
      this.loading = true;
      axios
        .get("/indicador", 
        {         
          params: {
            gestion_est: this.gestion,
            nroEst: this.searchGenContent01,
            sheet_title: this.searchGenContent02,
            nro_estadistica_ini: this.searchGenContent03,
            nro_estadistica_fin: this.searchGenContent05,
             fechaIni: this.searchGenContent06,
              fechaFin: this.searchGenContent07
          },
          headers: { Authorization: localStorage.token }
        })
        .then((response) => {
          this.products = response.data;
          this.searchedProducts = this.products;
          this.loading = false;
        })
        .catch((error) => {this.loading = false;})
    },
    createData() {
      this.reqData = {
        par_tramite: this.values01,
        nombres_apellidos: this.values02,
        fecha_nac: this.values03,
        numero_doc: this.values04,
        tipo_doc: this.values05,
        pais_nac: this.values06,
        serie: this.values07,
        fecha_emi: this.values08,
        fecha_ven: this.values09,
        lugar_emi: this.values10,
        estado: this.values11,
        observacion: this.values12
      };
      axios
        .post("/create", this.reqData, {
          headers: { Authorization: localStorage.token },
        })
        .then((response) => {
          this.showToast(
            "Successfully created!",
            {
              icon: 'fa-check',
              position: 'bottom-right',
              duration: 2500,
            },
          );
          this.getData();
        })
        .catch((error) => {
          this.showToast(
            "Failed to create!",
            {
              icon: 'fa-warning',
              position: 'bottom-right',
              duration: 2500,
            },
          )
        })
    },
    remove (user) {
      this.ind = user.id
      this.removeModal = true
    },
    verifyText() {

    },
    deleteData() {
      this.reqDel = {
        id: this.ind,
      };
      console.log(this.reqDel.id);
      axios
        .post("/del_id",this.reqDel, {
          headers: { Authorization: localStorage.token } 
        })
        .then((response) => {
          this.showToast(
            "Successfully removed",
            {
              icon: 'fa-check',
              position: 'bottom-right',
              duration: 2500,
            },
          )
          this.getData();
        })
    },
    refresh() {
      this.tableData = [];
      this.pieChartData.datasets.map(item => item.data = [0, 0, 0, 0]);
      console.log(this.pieChartData.datasets);
    },
    exportExcel() {
      console.log(this.json);
      const { head, fileName } = this.json;
      const dataSource = this.tableData;
      jsontoexcel.getXlsx(dataSource, head, fileName);
    },
    exportPDF() {
      let canvasChart = document.getElementById("chart-canvas");
      var source =  this.$refs["article"];
      let rows = [];
      let columnHeader = ['DEPARTAMENTO', 'TOTAL', 'VIVIENDA PARTICULAR', 'VIVIENDA COLECTIVA', 'TRANSEUNTES'];
      let pdfName = 'Schedule';
      source.data.forEach(element => {
          var temp = [
              element.dapartamento,
              element.total,
              element.particular,
              element.colectiva,
              element.transeuntes,
          ];
          rows.push(temp);
      });
      rows.push(["Total Count : " + rows.length.toString(), "", "", "", ""]);
      var doc = new jsPDF('p', 'mm', 'b1');
      var fullwidth = doc.internal.pageSize.width;
      var fullheight = doc.internal.pageSize.height;
      doc.addImage(require('../../assets/pdf/03.png'), 'PNG', 40, 10, 600, 60, 'img01');
      doc.setFontSize(40);
      doc.text("NÚMERO DE VIVENDAS POR TIPO DE VIVIENDA, SEGÚN", fullwidth / 2 - 200, 40 );
      doc.text("DEPARTAMENTO, PROVINCIA Y MUNICIPIO, CNPV 2012", fullwidth / 2 - 194, 60 );
      doc.setFontSize(20);
      doc.text("Usuario: " + localStorage.uid.toUpperCase(), 120, 90 );
      doc.text("Cantidad total de registros: " + (rows.length - 1).toString(), 120, 100 );
      doc.text("Cantidad registros filtrados: " + this.products.length.toString(), 120, 110 );
      doc.text("Fecha y hora de busqueda : " + this.searchDateTime, 420, 90 );
      doc.text("Fecha y hora de impresion : " + moment().format("DD/MM/YYYY HH:mm:ss").toString(), 420, 100 );
      doc.autoTable(columnHeader, rows, { startY: 330, styles: {fontSize: 16} });
      
      html2canvas(canvasChart).then((canvas) => {
        var imageData = canvas.toDataURL("image/png", 1.0);
        doc.addImage(imageData, "JPEG", 25, 120, 650, 200, 'img02');
        doc.save(pdfName + '.pdf');
      });
    },

    isDate(data) {
      return moment(data).format("DD/MM/YYYY");
    },

    isDateTime(data) {
      return moment(data).format("DD/MM/YYYY HH:mm:ss");
    },

    showUser(user) {
      
    },
    
    search01: debounce(function (term) {
      this.searchContent01.concat(term)
    }, 300),
    search02: debounce(function (term) {
      this.searchContent02.concat(term)
    }, 300),
    search03: debounce(function (term) {
      this.searchContent03.concat(term)
    }, 300),
    search04: debounce(function (term) {
      this.searchContent04.concat(term)
    }, 300),
    search05: debounce(function (term) {
      this.searchContent05.concat(term)
    }, 300),
    search06: debounce(function (term) {
      this.searchContent06.concat(term)
    }, 300),
    search07: debounce(function (term) {
      this.searchContent07.concat(term)
    }, 300),
    search08: debounce(function (term) {
      this.searchContent08.concat(term)
    }, 300),
    search09: debounce(function (term) {
      this.searchContent09.concat(term)
    }, 300),
    search10: debounce(function (term) {
      this.searchContent10.concat(term)
    }, 300),
    search11: debounce(function (term) {
      this.searchContent11.concat(term)
    }, 300),
    search12: debounce(function (term) {
      this.searchContent12.concat(term)
    }, 300),

    searchGen01: debounce(function (term) {
      this.searchGenContent01 = term
    }, 300),
    searchGen02: debounce(function (term) {
      this.searchGenContent02 = term
    }, 300),
    searchGen03: debounce(function (term) {
      this.searchGenContent03 = term
    }, 300),
    searchGen04: debounce(function (term) {
      this.searchGenContent04 = term
    }, 300),

    findUser: debounce(function (term) {
      this.searchUser = term
    }, 400),

    genSearch() {
      if( !this.searchGenContent01 && !this.searchGenContent02 && !this.searchGenContent03 && !this.searchGenContent04 ) {
        this.verifyModal = true;
        return
      };
      if( (!this.isValidateDate(this.searchGenContent04) && this.searchGenContent04)) {
        this.invalidModal = true;
        return
      };
      this.getData();

      this.searchContent01 =[],
      this.searchContent02 =[],
      this.searchContent03 =[],
      this.searchContent04 =[],
      this.searchContent05 =[],
      this.searchContent06 =[],
      this.searchContent07 =[],
      this.searchContent08 =[],
      this.searchContent09 =[],
      this.searchContent10 =[],
      this.searchContent11 =[],
      this.searchContent12 =[],

      this.searchDateTime = moment().format("DD/MM/YYYY HH:mm:ss").toString();
    },

    genClear() {
      this.searchGenContent01 = '';
      this.searchGenContent02 = '';
      this.searchGenContent03 = '';
      this.searchGenContent04 = '';
      this.gestion = 'TODOS';
      this.searchedProducts = [];
    },

    getOptions() {
      this.options01 = [];
      this.options02 = [];
      this.options03 = [];
      this.options04 = [];
      this.options05 = [];
      this.options06 = [];
      this.options07 = [];
      this.options08 = [];
      this.options09 = [];
      this.options10 = [];
      this.options11 = [];
      this.options12 = [];
      this.searchedProducts.map(product => {
        this.options01.push(product.par_tramite);
        this.options02.push(product.nombres_apellidos);
        this.options03.push(moment(product.fecha_nac).format("DD/MM/YYYY").toString());
        this.options04.push(product.numero_doc.toString());
        this.options05.push(product.tipo_doc);
        this.options06.push(product.pais_nac);
        this.options07.push(product.serie);
        this.options08.push(moment(product.fecha_emi).format("DD/MM/YYYY HH:mm:ss").toString());
        this.options09.push(moment(product.fecha_ven).format("DD/MM/YYYY HH:mm:ss").toString());
        this.options10.push(product.lugar_emi);
        this.options11.push(product.estado);
        this.options12.push(product.observacion);
      });
      this.options01 = [...new Set(this.options01)];
      this.options02 = [...new Set(this.options02)];
      this.options03 = [...new Set(this.options03)];
      this.options04 = [...new Set(this.options04)];
      this.options05 = [...new Set(this.options05)];
      this.options06 = [...new Set(this.options06)];
      this.options07 = [...new Set(this.options07)];
      this.options08 = [...new Set(this.options08)];
      this.options09 = [...new Set(this.options09)];
      this.options10 = [...new Set(this.options10)];
      this.options11 = [...new Set(this.options11)];
      this.options12 = [...new Set(this.options12)];
    },

    accountSelect(ind = 0) {
      if (this.accountIndex != ind) {
        this.accountIndex = ind
        this.$refs.article.currentPage = 1
        this.$refs.article.inputPage(1)
      }
    },
    showPassword() {
      alert(this.accountList[this.accountIndex]['password'])
    },
  },
};
</script>

<style lang="scss">

.chart-widget {
  .va-card__body {
    height: 450px;
  }
}

.table-title {
  width: 100%;
  height: 60px;
  background-color: #884ee1;
  color: lightgrey;
  font-size: 24px;
  font-weight: 700;
  text-align: cener;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid #3e1084;
  border-bottom: 2px solid #3e1084;
}

.user-list {
  height: 85vh;
}

#tableheader table thead tr th {
  background: lightgrey;
  color: #884ee1;
  height: 50px;
  padding-top: 20px;
  font-size: 12px;
  text-align: center;
  // display: flex;
  // align-items: center;
}

.user-active {
  background-color: lightgrey;
}
</style>