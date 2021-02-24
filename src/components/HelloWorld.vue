<template>
  <v-container fluid>
    <v-card>
          <v-toolbar>
            <v-toolbar-title>
                          Search
            </v-toolbar-title>
            <v-spacer></v-spacer>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="date" v-model="test.date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="applicant" v-model="test.applicant"
                ></v-text-field>
              </v-col>
            <v-btn @click="dataLoader" icon>
              <v-icon>
                mdi-rotate-orbit
              </v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text v-if="!dailyPatent.list.length">
              <div><h1>검색 결과는 이곳에 로드 됩니다. 검색을 해주세요</h1>119981042713</div>
          </v-card-text>
          <div v-else>
            <v-card-text>
                          {{this.dailyPatent.list.length}} 건의 데이터가 검색 되었습니다.
            </v-card-text>
            <v-card-text v-for="item in this.dailyPatent.list" v-bind:key="item">
            <!-- <ui>{{item.applicationDate}}</ui> <br>
              <ui>{{item.applicationName}}</ui><br>
              <ui>{{item.applicationNumber}}</ui><br>
              <ui>{{item.astrtCont}}</ui><br>
              <br>
              <ui>{{item.inventionTitle}}</ui><br>
              <ui>{{item.ipcNumber}}</ui><br>
              <ui>{{item.openDate}}</ui><br>
              <ui>{{item.registerStatus}}</ui><br> -->
               <v-card
              class="mx-auto"
              max-width
              >
              <v-card-title>{{item.inventionTitle}}
              <v-spacer></v-spacer>                  
              <v-card-subtitle class="pb-0">{{item.applicationName}}</v-card-subtitle>
              </v-card-title>
              
              <v-img
                class="white--text align-end"
                max-height="500"
                max-width="500"
                v-bind:src="item.bigDrawing"
              ></v-img>

              <v-card-text class="text--primary">
                <div>{{item.astrtCont}}</div>

                <div>{{item.ipcNumber}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                >
                  {{item.openDate}}
                </v-btn>

                <v-btn
                  color="orange"
                  text
                >
                  {{item.registerStatus}}
                </v-btn>
                <v-btn
                  color="orange"
                  text
                >
                  {{item.applicationNumber}}
                </v-btn>
                
              </v-card-actions>                   
            </v-card>
          </v-card-text>
          </div>
          </v-card>
  </v-container>
</template>
<script>
const { ipcRenderer } = require('electron')

export default {
    data(){
    
    return {
      test:{
        date: '',
        applicant: '',
      },
      dailyPatent : {
        list : []
      }
    }
  },
  methods: {
    dataLoader(){
     ipcRenderer.invoke('test', this.test).then((result) => {
       console.log(result)
       this.dailyPatent.list = result
      })
    },
    check(){
      console.log(this.dailyPatent.list)
      console.log(this.dailyPatent)
    }


  } 
}

document.addEventListener('keydown', (event) => {
    if(event.keyCode==123){ //F12
        //메인프로세스로 toggle-debug 메시지 전송 (디버그 툴 토글시켜라)
        ipcRenderer.send('toggle-debug', 'an-argument')
    }
    else if(event.keyCode==116){ //F5
        //메인프로세스로 refresh 메시지 전송 (페이지를 갱신시켜라)
        ipcRenderer.send('refresh', 'an-argument')
    }
})
</script>
