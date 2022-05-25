<template>
  <div>
    <div class="flex xs11 lg12" style="padding-left: 10px; margin-left: auto; margin-right: auto; margin-bottom: 20px; width: 40%;">
      <va-card class="fill-height" style="overflow-x: auto;">
        <va-notification style="margin-bottom: 20px;">
            {{ $t('GESTION(FLUJO)') }}
        </va-notification>
        <va-select
          :label="$t('SELECT')"
          v-model="gestion"
          :options="allowedCitiesList"
          key-by="text"
        />
        <va-input
          :value="searchGenContent01"
          :placeholder="$t('N* DOCUMENTO O SERIE')"
          @input="searchGen01"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
        <va-input
          :value="searchGenContent02"
          :placeholder="$t('NOMBRES')"
          @input="searchGen02"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
        <va-input
          :value="searchGenContent03"
          :placeholder="$t('APELLIDOS')"
          @input="searchGen03"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
        <va-input
          :value="searchGenContent04"
          :placeholder="$t('FECHA NACIMENTO DD/MM/YYYY')"
          @input="searchGen04"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
        <div class="mb-4">
          <va-notification style="margin-bottom: 20px;" v-show= "isHiddenIP">
            {{ $t(' Servicio INTERPOL INACTIVO  ') }}
          </va-notification>
            <va-notification style="margin-bottom: 20px;" v-show= "isHiddenMP">
            {{ $t(' Servicio Ministerio Publico INACTIVO  ') }}
          </va-notification>
        </div>
        <div class="flex xs12 mt-3">
          <div class="row align--center">
            <div class="flex xs6 md6" style="text-align: center;">
              <va-button icon="entypo entypo-search" @click="genSearch()"> BUSCAR</va-button>
            </div>
            <div class="flex xs6 md6" style="text-align: center;">
              <va-button icon="fa fa-refresh" @click="genClear()"> LIMPIAR</va-button>
            </div>
          </div>
        </div>
      </va-card>
    </div>
    <div class="flex xs11 lg12" style="padding-left: 10px;">
      <va-card class="fill-height" style="overflow-x: auto;">
        <div class="row mt-2">
           <div class="flex xs12 md12 lg12" style="text-align: end;">
           
            <va-button icon="fa fa-download" @click="exportExcel()"> EXPORTA EXCEL</va-button>
            <va-button icon="fa fa-download" @click="exportPDF()"> EXPORTA PDF</va-button>
          </div>
          <div class="flex xs12 md12 lg12" style="text-align: justify;">
          
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 1).length > 0 ? true:false" icon="entypo entypo-search" @click="result1()" style="background-color: #f03a24;">FLUJO</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 2).length > 0 ? true:false" icon="entypo entypo-search" @click="result2()" style="background-color: #f03a24;">PERMANENCIA</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 4).length > 0 ? true:false" icon="entypo entypo-search" @click="result4()" style="background-color: #f03a24;">VISA</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 5).length > 0 ? true:false" icon="entypo entypo-search" @click="result5()" style="background-color: #f03a24;">TRASPASO</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 6).length > 0 ? true:false" icon="entypo entypo-search" @click="result6()" style="background-color: #f03a24;">IMPEDIMENTO</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 7).length > 0 ? true:false" icon="entypo entypo-search" @click="result7()" style="background-color: #f03a24;">PASAPORTE</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 14).length > 0 ? true:false" icon="entypo entypo-search" @click="result14()" style="background-color: #f03a24;">SALIDA OBL.</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 20).length > 0 ? true:false" icon="entypo entypo-search" @click="result20()" style="background-color: #f03a24;">ALERTA</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 21).length > 0 ? true:false" icon="entypo entypo-search" @click="result21()" style="background-color: #f03a24;">MIN.PUBLICO</va-button>
            <va-button v-show= "this.resultProducts.filter(item => item.par_tramite == 23).length > 0 ? true:false" icon="entypo entypo-search" @click="result23()" style="background-color: #f03a24;">INTERPOL</va-button>
             
          </div>
       
        </div>
        <div class="flex xs12 mt-3">
          <div class="row align--center">
            <div class="flex xs12 md2">
              <va-select
                :label="$t('MODULO')"
                v-model="searchContent01"
                multiple
                :options="options01"
                @input="search01"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('NOMBRE Y APELLIDOS')"
                v-model="searchContent02"
                multiple
                :options="options02"
                @input="search02"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('FECHA NACIMIENTO')"
                v-model="searchContent03"
                multiple
                :options="options03"
                @input="search03"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('NÚMERO DOCUMENTO')"
                v-model="searchContent04"
                multiple
                :options="options04"
                @input="search04"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('TIPO DOCUMENTO')"
                v-model="searchContent05"
                multiple
                :options="options05"
                @input="search05"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('NACIONALIDAD')"
                v-model="searchContent06"
                multiple
                :options="options06"
                @input="search06"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('NÚMERO DE SERIE')"
                v-model="searchContent07"
                multiple
                :options="options07"
                @input="search07"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('FECHA EMISIÓN')"
                v-model="searchContent08"
                multiple
                :options="options08"
                @input="search08"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('FECHA EXP')"
                v-model="searchContent09"
                multiple
                :options="options09"
                @input="search09"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('LUGAR EMISIÓN')"
                v-model="searchContent10"
                multiple
                :options="options10"
                @input="search10"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('ESTADO')"
                v-model="searchContent11"
                multiple
                :options="options11"
                @input="search11"
              />
            </div>
            <div class="flex xs12 md2">
              <va-select
                :label="$t('OBSERVACIÓN')"
                v-model="searchContent12"
                multiple
                :options="options12"
                @input="search12"
              />
            </div>
          </div>
          <va-data-table
            id="tableheader"
            ref="article"
            :fields="fields"
            :data="searchedProducts"
            :loading="loading"
            @row-clicked="showUser"
            clickable
            api-mode
            thead-class="greenColor"
          >
            <template slot="Tipo Busqueda" slot-scope="props">
              {{ props.rowData.par_tramite }}
            </template>

            <template slot="Nombres y Apellidos" slot-scope="props">
              {{ props.rowData.nombres_apellidos }}
            </template>

            <template slot="Fecha De Nacimiento" slot-scope="props">
              {{ isDate(props.rowData.fecha_nac) }}
            </template>

            <template slot="Numero De Documento" slot-scope="props">
              {{ props.rowData.numero_doc }}
            </template>

            <template slot="Tipo Documento" slot-scope="props">
              {{ props.rowData.tipo_doc }}
            </template>

            <template slot="Pais Nacionalidad" slot-scope="props">
              {{ props.rowData.pais_nac }}
            </template>

            <template slot="Numero De Serie" slot-scope="props">
              {{ props.rowData.serie }}
            </template>

            <template slot="Fecha Emision" slot-scope="props">
              {{ isDateTime(props.rowData.fecha_emi) }}
            </template>

            <template slot="Fecha Exp" slot-scope="props">
              {{ isDateTime(props.rowData.fecha_ven) }}
            </template>

            <template slot="Lugar Emision" slot-scope="props">
              {{ props.rowData.lugar_emi }}
            </template>

            <template slot="Estado" slot-scope="props">
              {{ props.rowData.estado }}
            </template>

            <template slot="Observacion" slot-scope="props">
              {{ props.rowData.observacion }}
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
          <form>
            <div class="row">
              <div class="col pr-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values01"
                    label="MODULO"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
              <div class="col pl-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values02"
                    label="NOMBRES Y APELLIDOS"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col pr-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values03"
                    label="FECHA DE NACIMIENTO"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
              <div class="col pl-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values04"
                    label="NUMERO DE DOCUMENTO"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col pr-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values05"
                    label="TIPO DOCUMENTO"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
              <div class="col pl-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values06"
                    label="PAIS NACIONALIDAD"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col pr-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values07"
                    label="NUMERO DE SERIE"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
              <div class="col pl-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values08"
                    label="FECHA EMISION"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col pr-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values09"
                    label="FECHA EXP."
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
              <div class="col pl-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values10"
                    label="LUGAR EMISION"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col pr-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values11"
                    label="ESTADO"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
              <div class="col pl-3">
                <div class="flex lg12">
                  <va-input
                    v-model="values12"
                    label="OBSERVACION"
                  >
                    <va-icon
                      slot="prepend"
                      name="va-icon entypo entypo-user"
                    />
                  </va-input>
                </div>
              </div>
            </div>
          </form>
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
import { jsontoexcel } from "vue-table-to-excel";
import config from "@/config";
axios.defaults.baseURL = config.API_URL;

export default {
  data() {
    return {
      addModal: false,
      verifyModal: false,
      invalidModal: false,
      isHiddenMP: false,
      isHiddenIP: false,
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
      resultProducts: [],
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
        "TODOS", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015",
        "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006",
        "2005", "2004", "2003", "2002", "2001", "2000"
      ],

      ind: null,
      removeModal: false,

      json: {
        head: [
                "ID TRAM", "FLUJO", "NOMBRES Y APELLIDOS","FECHA DE NACIMIENTO",
                "NÚMERO DE DOCUMENTO", "TIPO DOCUMENTO", "PAÍS NACIONALIDAD",
                "NÚMERO DE SERIE", "FECHA EMISIÓN", "FECHA EXP",
                "LUGAR EMISIÓN", "ESTADO", "OBSERVACIÓN",
                "FECHA REG","PAR TRAMITE"
              ],
        fileName: "Reporte_flujo_" + moment().format("DD/MM/YYYY HH:mm:ss").toString() + ".xls"
      },

      searchDateTime: ''
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "__slot:Tipo Busqueda",
          title: "MODULO",
          // width: "15%",
        },
        {
          name: "__slot:Nombres y Apellidos",
          title: "NOMBRES Y APELLIDOS",
          // width: "15%",
        },
        {
          name: "__slot:Fecha De Nacimiento",
          title: "FECHA DE NACIMIENTO",
          // width: "15%",
        },
        {
          name: "__slot:Numero De Documento",
          title: "NÚMERO DE DOCUMENTO",
          // width: "15%",
        },
        {
          name: "__slot:Tipo Documento",
          title: "TIPO DOCUMENTO",
          // width: "15%",
        },
        {
          name: "__slot:Pais Nacionalidad",
          title: "PAÍS NACIONALIDAD",
          // width: "15%",
        },
        {
          name: "__slot:Numero De Serie",
          title: "NÚMERO DE SERIE",
          // width: "15%",
        },
        {
          name: "__slot:Fecha Emision",
          title: "FECHA EMISIÓN",
          // width: "15%",
        },
        {
          name: "__slot:Fecha Exp",
          title: "FECHA EXP..",
          // width: "15%",
        },
        {
          name: "__slot:Lugar Emision",
          title: "LUGAR EMISIÓN",
          // width: "15%",
        },
        {
          name: "__slot:Estado",
          title: "ESTADO",
          // width: "15%",
        },
        {
          name: "__slot:Observacion",
          title: "OBSERVACIÓN",
          // width: "15%",
        },
        {
          name: "__slot:actions",
          title: "ACTIONS",
        }
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
        .get("/flujo", 
        {
          params: {
            gestionReg: this.gestion,
            nroDoc: this.searchGenContent01,
            nomApellidos: this.searchGenContent02 + this.searchGenContent03,
            nombres: this.searchGenContent02,
            apellidos: this.searchGenContent03,
            fechaNac: this.searchGenContent04,
            login:localStorage.uid
          },
          headers: { Authorization: localStorage.token }
        })
        .then((response) => {
          this.resultProducts = response.data;
          this.loading = false;
              //  console.log( response.data) ;
            //   console.log( Object.values(Object.values(response.data)[1])[0]  ) ;
          var array = response.data;
           
            if(array.length >1){
              array = array[array.length-1].filter( record => record.errorKey);
              console.log(array);
             // console.log(Object.values(array).some(code => code.errorKey.includes ("NOT_FOUND_INTERPOL")));
            if(array.some(code => code.errorKey.includes ("NOT_FOUND_INTERPOL"))){
                     this.isHiddenIP =  true; //response.data.errorKey;
              }else{
                 this.isHiddenIP =  false;
              }
              //  console.log(Object.values(array).some(code => code.errorKey.includes ("NOT_FOUND_MIN_PUB")));
            if(array.some(code => code.errorKey.includes ("NOT_FOUND_MIN_PUB"))){
               this.isHiddenMP =  true; 
              } else{
                 this.isHiddenMP =  false;
              }                    
              
            }
        
        })
        .catch((error) => {
            console.log(error.message);
          this.loading = false;
          })
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
    result1() { // para mostrar los tabs
      this.products = this.resultProducts.filter(item => item.par_tramite == "1");
      this.searchedProducts = this.products;     
    },
    result2() {
      this.products = this.resultProducts.filter(item => item.par_tramite == "2");
      this.searchedProducts = this.products;
    },
    result4() {
      this.products = this.resultProducts.filter(item => item.par_tramite == "4");
      this.searchedProducts = this.products;
    },
      result5() { // para mostrar los tabs
      this.products = this.resultProducts.filter(item => item.par_tramite == "5");
      this.searchedProducts = this.products;
    },
    result6() {
      this.products = this.resultProducts.filter(item => item.par_tramite == "6");
      this.searchedProducts = this.products;
    },
    result7() {
      this.products = this.resultProducts.filter(item => item.par_tramite == "7");
      this.searchedProducts = this.products;
    },
      result14() { // para mostrar los tabs
      this.products = this.resultProducts.filter(item => item.par_tramite == "14");
      this.searchedProducts = this.products;
    },
    result20() {
      this.products = this.resultProducts.filter(item => item.par_tramite == "20");
      this.searchedProducts = this.products;
    },
    result21() {
      this.products = this.resultProducts.filter(item => item.par_tramite == "21");
      this.searchedProducts = this.products;
    },
      result23() {
      this.products = this.resultProducts.filter(item => item.par_tramite == "23");
      this.searchedProducts = this.products;
    },
    exportExcel() {
      console.log(this.json);
      const { head, fileName } = this.json;
      const dataSource = this.searchedProducts;
      jsontoexcel.getXlsx(dataSource, head, fileName);
    },
    exportPDF() {
      var source =  this.$refs["article"];
        let rows = [];
        let columnHeader = ['ID TRAM', 'FLUJO', 'NOMBRES Y APELLIDOS', 'FECHA DE NACIMIENTO', 'NUMERO DE DOCUMENTO', 'TIPO DOCUMENTO', 'PAIS NACIONALIDAD', 'NUMERO DE SERIE', 'FECHA EMISION', 'FECHA EXP', 'LUGAR EMISION', 'ESTADO', 'OBSERVACION', 'FECHA REG', 'PAR TRAMITE'];
        let pdfName = ' "Reporte_flujo';
        source.data.forEach(element => {
            var temp = [
                element.id_tramite,
                element.modulo_sigla,
                element.nombres_apellidos,
                this.isDate(element.fecha_nac),
                element.numero_doc,
                element.tipo_doc,
                element.pais_nac,
                element.serie,
                this.isDateTime(element.fecha_emi),
                this.isDateTime(element.fecha_ven),
                element.lugar_emi,
                element.estado,
                element.observacion,
                this.isDateTime(element.fecha_Reg),
                element.par_tramite,
            ];
            rows.push(temp);
        });
        rows.push(["Total Count : " + rows.length.toString(), "", "", "", "", "","", "", "", "", "","", "", "", "", "","", "", "" ]);
        var doc = new jsPDF('p', 'mm', 'b1');
        var fullwidth = doc.internal.pageSize.width;
        var fullheight = doc.internal.pageSize.height;
        doc.addImage(require('../../assets/pdf/03.png'), 'PNG', 40, 10, 600, 60, 'img01');
        doc.setFontSize(40);
        doc.text("REPORTE DE CONSULTAS DE FLUJO", fullwidth / 2 - 120, 50 );
        doc.setFontSize(20);
        doc.text("Usuario: " + localStorage.uid.toUpperCase(), 120, 90 );
        doc.text("Cantidad total de registros: " + (rows.length - 1).toString(), 120, 100 );
        doc.text("Cantidad registros filtrados: " + this.products.length.toString(), 120, 110 );
        doc.text("Fecha y hora de busqueda : " + this.searchDateTime, 420, 90 );
        doc.text("Fecha y hora de impresion : " + moment().format("DD/MM/YYYY HH:mm:ss").toString(), 420, 100 );
        doc.autoTable(columnHeader, rows, { startY: 120, styles: {fontSize: 11} });
        doc.save(pdfName+'_'+moment().format("DD/MM/YYYY HH:mm:ss").toString() + '.pdf');
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
.user-list {
  height: 85vh;
}

#tableheader table thead tr th {
  background: #105544;
  color: white;
  height: 50px;
  padding-top: 20px;
  // font-size: 12px;
  // text-align: center;
  // display: flex;
  // align-items: center;
}

.user-active {
  background-color: lightgrey;
}
</style>