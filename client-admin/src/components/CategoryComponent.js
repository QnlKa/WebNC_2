import React, { Component } from "react";
import "../styles/Product.css";
import axios from "axios";
import MyContext from "../contexts/MyContext";

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: { _id: "", name: "", img: "" },
      update: false,
      add: false,
      itemadd: { name: "", img: "" },
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
          <td>{item.ID}</td>
          <td>{item.name}</td>
          <td>
            <img
              src={"data:image/jpg;base64" + item.image}
              width="150px"
              height="150px"
              alt=""
            />
          </td>
          <td className="ce">
            <button
              class="btn btn-primary btn-sm trash"
              type="button"
              title="Delete"
              onClick={(e) => this.btnDeleteClick(e, item._id)}
            >
              <i class="fas fa-trash-alt"></i>
            </button>
            <span>{"     "}</span>

            <button
              class="btn btn-primary btn-sm edit"
              type="button"
              title="Edit"
              id="show-emp"
              data-toggle="modal"
              data-target="#ModalUP"
              onClick={() => this.showModal()}
            >
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      );
    });
    return (
      // <div className="align-center">
      //   <h2 className="text-center">ADMIN HOME</h2>
      //   <img
      //     src="http://cliparting.com/wp-content/uploads/2018/03/animated-emoticons-2018-13.gif"
      //     width="800px"
      //     height="600px"
      //     alt=""
      //   />
      // </div>
      <>
        <div>
          <div class="row">
            <div class="col-md-12">
              <div class="tile">
                <div class="tile-body">
                  <div class="row element-button">
                    <div class="col-sm-2">
                      <button
                        class="btn btn-save"
                        type="button"
                        onClick={() => this.showAdd()}
                      >
                        Add New Category
                      </button>
                    </div>
                  </div>
                  <table
                    class="table table-hover table-bordered"
                    id="sampleTable"
                  >
                    <thead className="Product">
                      <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Image</th>
                        {/* 
                      <th>Quanity</th>
                      <th>State</th>
                      <th>Price</th>
                      <th>Category</th> */}
                        <th>Funtion</th>
                      </tr>
                    </thead>
                    <tbody>{cates}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.update === true ? (
          <div
            class="modal1 fade"
            id="modalup"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="row">
                    <div class="form-group  col-md-12">
                      <span class="thong-tin-thanh-toan">
                        <h5>Edit Category Information</h5>
                      </span>
                    </div>
                  </div>
                  <div class="row">
                    {/* <div class="form-group col-md-6">
                      <label class="control-label">Mã sản phẩm </label>
                      <input
                        class="form-control"
                        type="number"
                        value="71309005"
                      />
                    </div> */}
                    <div class="form-group col-md-7">
                      <label class="control-label">Category Name</label>
                      <input
                        class="form-control"
                        type="text"
                        required
                        value={this.state.itemSelected.name}
                        onChange={(e) => {
                          this.setState({
                            itemSelected: {
                              ...this.state.itemSelected,
                              name: e.target.value,
                            },
                          });
                          console.log(this.state);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label className="control-label">Product Image</label>
                      <div id="myfileupload">
                        <input
                          type="file"
                          id="uploadfile"
                          name="ImageUpload"
                          onChange={this.handleFileChange1}
                        />
                      </div>
                      <div id="thumbbox">
                        {this.state.itemSelected.image && (
                          // eslint-disable-next-line jsx-a11y/img-redundant-alt
                          <img
                            height="250"
                            width="300"
                            alt="Thumb image"
                            id="thumbimage"
                            src={this.state.itemSelected.image}
                          />
                        )}
                      </div>
                      <div id="boxchoice">
                        <p></p>
                      </div>
                    </div>
                    {/* <div class="form-group  col-md-6">
                    <label class="control-label">Số lượng</label>
                    <input
                      class="form-control"
                      type="number"
                      required
                      value="20"
                    />
                  </div>
                  <div class="form-group col-md-6 ">
                    <label for="exampleSelect1" class="control-label">
                      Tình trạng sản phẩm
                    </label>
                    <select class="form-control" id="exampleSelect1">
                      <option>Còn hàng</option>
                      <option>Hết hàng</option>
                      <option>Đang nhập hàng</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="control-label">Giá bán</label>
                    <input class="form-control" type="text" value="5.600.000" />
                  </div> */}
                    {/* <div class="form-group col-md-6">
                    <label for="exampleSelect1" class="control-label">
                      Danh mục
                    </label>
                    <select class="form-control" id="exampleSelect1">
                      <option>Bàn ăn</option>
                      <option>Bàn thông minh</option>
                      <option>Tủ</option>
                      <option>Ghế gỗ</option>
                      <option>Ghế sắt</option>
                      <option>Giường người lớn</option>
                      <option>Giường trẻ em</option>
                      <option>Bàn trang điểm</option>
                      <option>Giá đỡ</option>
                    </select>
                  </div> */}
                  </div>

                  <button
                    class="btn btn-save"
                    type="button"
                    onClick={(e) => this.btnUpdateClick(e)}
                  >
                    SAVE
                  </button>
                  <span> </span>
                  <button
                    class="btn btn-cancel"
                    type="button"
                    onClick={() => this.HideModal()}
                  >
                    CANCEL
                  </button>
                  <br />
                </div>
                <div class="modal-footer"></div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {this.state.add === true ? (
          <div
            class="modal1 fade"
            id="modalup"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
            data-backdrop="static"
            data-keyboard="false"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="row">
                    <div class="form-group  col-md-12">
                      <span class="thong-tin-thanh-toan">
                        <h5>Add Category</h5>
                      </span>
                    </div>
                  </div>
                  <div class="row">
                    {/* <div class="form-group col-md-6">
                      <label class="control-label">Mã sản phẩm </label>
                      <input
                        class="form-control"
                        type="number"
                        value="71309005"
                      />
                    </div> */}
                    <div class="form-group col-md-7">
                      <label class="control-label">Category Name</label>
                      <input
                        class="form-control"
                        type="text"
                        required
                        value={this.state.itemadd.name}
                        onChange={(e) => {
                          this.setState({
                            itemadd: {
                              ...this.state.itemadd,
                              name: e.target.value,
                            },
                          });
                          console.log(this.state);
                        }}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label className="control-label">Product Image</label>
                      <div id="myfileupload">
                        <input
                          type="file"
                          id="uploadfile"
                          name="ImageUpload"
                          onChange={this.handleFileChange}
                        />
                      </div>
                      <div id="thumbbox">
                        {this.state.itemadd.img && (
                          // eslint-disable-next-line jsx-a11y/img-redundant-alt
                          <img
                            height="250"
                            width="300"
                            alt="Thumb image"
                            id="thumbimage"
                            src={this.state.itemadd.img}
                          />
                        )}
                      </div>
                      <div id="boxchoice">
                        <p></p>
                      </div>
                    </div>
                    {/* <div class="form-group  col-md-6">
                    <label class="control-label">Số lượng</label>
                    <input
                      class="form-control"
                      type="number"
                      required
                      value="20"
                    />
                  </div>
                  <div class="form-group col-md-6 ">
                    <label for="exampleSelect1" class="control-label">
                      Tình trạng sản phẩm
                    </label>
                    <select class="form-control" id="exampleSelect1">
                      <option>Còn hàng</option>
                      <option>Hết hàng</option>
                      <option>Đang nhập hàng</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="control-label">Giá bán</label>
                    <input class="form-control" type="text" value="5.600.000" />
                  </div> */}
                    {/* <div class="form-group col-md-6">
                    <label for="exampleSelect1" class="control-label">
                      Danh mục
                    </label>
                    <select class="form-control" id="exampleSelect1">
                      <option>Bàn ăn</option>
                      <option>Bàn thông minh</option>
                      <option>Tủ</option>
                      <option>Ghế gỗ</option>
                      <option>Ghế sắt</option>
                      <option>Giường người lớn</option>
                      <option>Giường trẻ em</option>
                      <option>Bàn trang điểm</option>
                      <option>Giá đỡ</option>
                    </select>
                  </div> */}
                  </div>

                  <button
                    class="btn btn-save"
                    type="button"
                    onClick={(e) => this.btnAddClick(e)}
                  >
                    SAVE
                  </button>
                  <span> </span>
                  <button
                    class="btn btn-cancel"
                    type="button"
                    onClick={() => this.HideAdd()}
                  >
                    CANCEL
                  </button>
                  <br />
                </div>
                <div class="modal-footer"></div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
  //FUNTION
  showModal() {
    this.setState({ update: true });
  }
  showAdd() {
    this.setState({ add: true });
  }
  HideAdd() {
    this.setState({ add: false });
  }
  HideModal() {
    this.setState({ update: false });
  }
  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };
  componentDidMount() {
    this.apiGetCategories();
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
    console.log(item);
  }
  handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgSrc = e.target.result;
      this.setState({
        itemadd: { ...this.state.itemadd, img: imgSrc },
      });
      console.log(this.state.itemadd);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ itemadd: { ...this.state.itemadd, img: null } }); // Hoặc bạn có thể đặt giá trị mặc định khác ở đây
    }
  };
  handleFileChange1 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgSrc = e.target.result;
      this.setState({
        itemSelected: { ...this.state.itemSelected, image: imgSrc },
      });
      console.log(this.state.itemSelected);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({
        itemSelected: { ...this.state.itemSelected, image: null },
      }); // Hoặc bạn có thể đặt giá trị mặc định khác ở đây
    }
  };
  // data funtion
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.itemadd.name;
    const image = this.state.itemadd.img;
    if (name && image) {
      const cate = { name: name, image: image };
      this.apiPostCategory(cate);
    } else {
      alert("Please input name");
    }
  }
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.itemSelected._id;
    const name = this.state.itemSelected.name;
    const image = this.state.itemSelected.image;
    if (id && name && image) {
      const cate = { name: name, image: image };
      this.apiPutCategory(id, cate);
    } else {
      alert("Please input id and name");
    }
  }
  btnDeleteClick(e, _id) {
    e.preventDefault();
    if (window.confirm("ARE YOU SURE?")) {
      if (_id) {
        this.apiDeleteCategory(_id);
      } else {
        alert("Please input id");
      }
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      const result = res.data;
      console.log(result);
      this.setState({ categories: result });
    });
  }
  apiPostCategory(cate) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/admin/categories", cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY!");
        this.apiGetCategories();
        this.HideAdd();
        this.setState({
          nameadd: "",
        });
      } else {
        alert("SORRY BABY!");
      }
    });
  }
  apiPutCategory(id, cate) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/categories/" + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY!");
        this.apiGetCategories();
        this.HideModal();
      } else {
        alert("SORRY BABY!");
      }
    });
  }
  apiDeleteCategory(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.delete("/api/admin/categories/" + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY!");
        this.apiGetCategories();
      } else {
        alert("SORRY BABY!");
      }
    });
  }
}
export default Category;
