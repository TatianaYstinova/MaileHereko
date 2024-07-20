import axios from 'axios';
import {KINOPOISK_API} from '../../components/api/const';

function Запрос(){
    // Запрос к API
    axios.get('https://api.kinopoisk.dev/movie', {
      params: { version: '1.4' },
      headers: { 'X-API-KEY': KINOPOISK_API }
    }).then((response:any) => {
      // Обработка успешного ответа
      console.log('Запрос выполнен успешно.');
    }).catch((error:any) => {
      // Обработка ошибки
      console.error('Ошибка при выполнении запроса: ', error);
    });
    return(
        <></>
    );
}
export default Запрос