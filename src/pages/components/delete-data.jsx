import axios from 'axios';
import Swal from "sweetalert2";
import baseurl from '../../constant/baseurl';
import { getTokenFromLocalStorage } from "../../store/localStorage";


export const handleDelete = (id, path) => {
   Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'File akan dihapus segera dihapus',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
   }).then(async result => {
      if (result.value) {
         const response = await axios.delete(`${baseurl.apiUrl}/${path}/${id}?_method=DELETE`, {
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
            console.log('1');
            Swal.fire('Dihapus!', 'File gagal dihapus.', 'error');
            // throw new Error(response.error.message);
            return;
         }

         if (response.data.error) {
            console.log('2');
            throw new Error('Terjadi kesalahan');
         }
         window.location.reload(false);
         Swal.fire('Dihapus!', 'File berhasil dihapus.', 'success');

      }
   });
};
