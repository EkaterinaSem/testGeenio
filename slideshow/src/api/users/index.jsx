define(() => {

  const getAllUsers = () => {
    return $.ajax({
      method:   `GET`,
      crossDomain: true,
      url:      `https://geenio-test-job.herokuapp.com/api/v1/users?api_key=DVEXd6WRcc69cvXI`,
      dataType: `json`,
    })
      .then((data) => {
        return data;
      })
  };

  return {
    getAllUsers,
  }
});
