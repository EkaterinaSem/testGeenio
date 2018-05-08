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
  });
};

const createUser = (user) => {
  return $.ajax({
    method: `POST`,
    crossDomain: true,
    url: `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI`,
    data: user,
  });
};

const searchUser = (search_field) => {
  return $.ajax({
    method: `GET`,
    crossDomain: true,
    url: `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI&name=${search_field}`,
  });
};

const deleteUser = (id) => {
  return $.ajax({
    method: `DELETE`,
    crossDomain: true,
    url: `https://geenio-test-job.herokuapp.com/api/v1/users/${id}?api_key=DVEXd6WRcc69cvXI`,
    dataType: `json`,
  });
};

const editUser = (user) => {
  return $.ajax({
    method: `PUT`,
    crossDomain: true,
    url: `https://geenio-test-job.herokuapp.com/api/v1/users/${user.id}?api_key=DVEXd6WRcc69cvXI`,
    dataType: `json`,
    data: user,
  });
}

export default {
  getAllUsers,
  createUser,
  searchUser,
  deleteUser,
  editUser
}