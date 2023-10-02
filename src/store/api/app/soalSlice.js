// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import { updateSearchFilter, updateCategoryFilter } from "./action";

const initialSoalState = {
  items: [],
  // jumlahSoal: 0
  listSoal: [],
  listJawaban: [],
};

const soalSlice = createSlice({
  name: "soal",
  initialState: initialSoalState,
  reducers: {
    addSoal: (state, action) => {
      // console.log('state', state)
      // console.log('action', action)
      state.items = action.payload;

      // state.listSoal = action.payload[0];
    },
   
    getSoal: (state, action) => {
      let { nomor } = action.payload;
      console.log('get nomor', nomor)
      if(state.listSoal.length != 0){
        state.listSoal = [];
      }
      let data = {};
      // console.log('nomor', nomor)
      
      for (var i = 0; i < state.items.length; i++) {
        if (state.items[i]['nomor'] === nomor) {
          
          data = state.items[i];
          console.log('data', data)
          break;
        }
      }
      
      state.listSoal.push(data);
      // console.log('soal', state.listSoal);

    },
    updateListSoal: (state, action) => {
      let { nomor, jawaban, keterangan } = action.payload;
      console.log('nomor', nomor)
      console.log('jawaban', jawaban)
      console.log('keterangan', keterangan)
      if(state.listSoal.length != 0){
        state.listSoal = [];
      }
      let data = {};
      let data2 = {};
      for (var i = 0; i < state.items.length; i++) {
        if (state.items[i]['nomor'] === nomor) {
          console.log('item', state.items[i])
          // data = { ...state.items, jawaban_user: jawaban, keterangan: keterangan }
          data = state.items[i];
          state.items[i].jawaban_user = jawaban;
          state.items[i].keterangan = keterangan;
          // delete state.items(i)

          
          break;
        }
      }
      // state.listSoal = { ...state.listSoal, jawaban_user: jawaban, keterangan: keterangan }
      
      state.listSoal.push({ ...data, jawaban_user: jawaban, keterangan: keterangan })
      // state.items.push({ ...data, jawaban_user: jawaban, keterangan: keterangan })
      // state.listSoal.push(data)
      getSoal(nomor)
      // state.listSoal = new_obj;
      // state.listJawaban.push(new_obj)
      // console.log('items after', data)
    },

    // addListSoal: (state, action) => {
    //   // if (state.listSoal.length != 0) {
    //   //   state.listSoal = [];
    //   // }
    //   let data = {};
    //   for (var i = 0; i < action.payload[0].length; i++) {
    //     if (action.payload[0][i]['nomor'] === action.payload[1].nomor) {
    //       data = action.payload[0][i];
    //       break;
    //     }
    //   }
      
    //   state.listSoal.push(data);
    //   console.log('soal', state.listSoal);
    // },
    
    removeListSoal: (state, action) => {
      state.listSoal = [];
      state.items = [];
    },
    confirmSoal: (state, action) => {
      console.log('action confirm', action)
    }

  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(updateSearchFilter, (state, action) => {
  //         state.filters.search = action.payload;
  //       })
  //       .addCase(updateCategoryFilter, (state, action) => {
  //         state.filters.category = action.payload;
  //       });
  //   },
});

export const { addSoal, getSoal, updateListSoal, removeListSoal, confirmSoal } = soalSlice.actions;
export default soalSlice.reducer;
