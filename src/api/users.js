import $ from "jquery";
/**
 * Общая информация о приложении
 * @returns {Promise}
 */
const getAllUsers = (offset = 1) => {
  return $.ajax({
    method:   `GET`,
    crossDomain: true,
    url:      `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI`,
    dataType: `json`,
    data: {
      offset: (offset - 1) * 10,
    }
  })
  .then((data) =>{
    return data;
  });
};



export default {
  getAllUsers
}