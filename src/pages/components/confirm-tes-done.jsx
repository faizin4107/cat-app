import axios from 'axios';
import Swal from "sweetalert2";
import baseurl from '@/constant/baseurl';
import { getTokenFromLocalStorage } from "@/store/localStorage";

export const confirmTesDone = (data, count) => {
   Swal.fire({
      title: 'Apakah sudah yakin?',
      text: 
      count === 0 ?
      'Jawaban akan langsung diproses' :
      `Ada ${count} jawaban yang belum dijawab, Jawaban akan langsung diproses`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
   }).then(async result => {
      if (result.value) {
         // console.log('id', id)
         // console.log('path', path)
         // console.log('data', data)
         const response = await axios.post(`${baseurl.apiUrl}/hasil-tes`, data, {
            headers: {
               "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
            },
         }).then(
            result => {
               // console.log('result', result)
               return result;
            },
            err => {
               // console.log('err', err)
               return err;
            },
         );
         // console.log('response', response)
         // console.log('response update', response);
         if (response.error) {
            // console.log('1');
            Swal.fire('Dihapus!', 'Data gagal dikirim.', 'error');
            // throw new Error(response.error.message);
            return;
         }

         if (response.data.error) {
            // console.log('2');
            throw new Error('Terjadi kesalahan');
         }
      //    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
      //    const response = await createData({path: '/hasil-tes', post: data});
      //    if (response.error) {
      //       console.log('1');
      //       toast.error('Terjadi kesalahan');
      //       // throw new Error(response.error.message);
      //       return;
      //   }

      //   if (response.data.error) {
      //       console.log('2');
      //       throw new Error('Terjadi kesalahan');
      //   }

         window.location.href = '/hasil-tes-peserta'
      // return true;

      }
   });
};
