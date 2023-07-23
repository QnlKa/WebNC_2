/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import "../styles/Product.css";
import MyContext from "../contexts/MyContext";
import axios from "axios";
class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: {
        id: "",
        name: "",
        price: 0,
        category: { name: "", _id: "" },
        image: "",
        decription: "",
      },
      screen: 0,

      addtitem: {
        txtName: "",
        txtPrice: 0,
        cmbCategory: "",
        imgProduct: "",
        decription: "",
      },
    };
  }
  render() {
    const catesadd = this.state.categories.map((cate) => {
      return (
        <option key={cate._id} value={cate._id}>
          {cate.name}
        </option>
      );
    });
    const catessave = this.state.categories.map((cate) => {
      return (
        <option
          key={cate._id}
          value={cate._id}
          selected={cate._id === this.state.itemSelected.category._id}
        >
          {cate.name}
        </option>
      );
    });
    const prods = this.state.products.map((item, index) => {
      return (
        <tr key={item._id} className="" onClick={() => this.trItemClick(item)}>
          <td className="ce">{index + (this.state.curPage - 1) * 4 + 1}</td>
          <td className="ce">{item.ID}</td>
          <td className="oitem">{item.name}</td>
          <td>
            <img
              src={"data:image/jpg;base64," + item.image}
              width="100px"
              height="100px"
              alt=""
            />
          </td>

          <td className="oitem">{item.price} đ</td>
          <td className="oitem">{item.category.name}</td>
          {item.decription.length > 15 ? (
            <td className="oitem">{item.decription.slice(0, 15)}...</td>
          ) : (
            <td className="oitem">{item.decription}</td>
          )}

          <td className="oitem">
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
              onClick={() => this.screen2()}
            >
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      );
    });
    const pagination = Array.from(
      { length: this.state.noPages },
      (_, index) => {
        if (index + 1 === this.state.curPage) {
          return (
            <span key={index}>
              | <b>{index + 1}</b> |
            </span>
          );
        } else {
          return (
            <span
              key={index}
              className="link"
              onClick={() => this.lnkPageClick(index + 1)}
            >
              | {index + 1} |
            </span>
          );
        }
      }
    );

    return (
      <>
        {this.state.screen === 0 ? (
          <div className="prod">
            <div class="row">
              <div class="col-md-12">
                <div class="tile">
                  <div class="tile-body">
                    <div class="row element-button">
                      <div class="col-sm-2">
                        <button
                          class="btn btn-save"
                          type="button"
                          onClick={() => this.screen1()}
                        >
                          Add New Product
                        </button>
                      </div>
                    </div>
                    <table
                      class="table table-hover table-bordered "
                      id="sampleTable"
                    >
                      <thead className="Product">
                        <tr>
                          <th>Number</th>
                          <th>Product ID</th>
                          <th>Product Name</th>
                          <th>Image</th>
                          <th>Price</th>
                          <th>Category</th>
                          <th>Decription</th>
                          <th>Funtion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prods}
                        <tr>
                          <td colSpan="9">{pagination}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {this.state.screen === 1 ? (
          <div className="addnewProduct">
            <div className="row small-component ">
              <div className="col-sm-6">
                <div className="tile">
                  <h3 className="tile-title">Add Product</h3>
                  <div className="tile-body">
                    <div className="row element-button">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-4"></div>
                      <div className="col-sm-4"></div>
                    </div>
                    <form className="row">
                      <div className="form-group col-md-6">
                        <label className="control-label">Product Name</label>
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.addtitem.txtName}
                          onChange={(e) => {
                            this.setState({
                              addtitem: {
                                ...this.state.addtitem,
                                txtName: e.target.value,
                              },
                            });
                            console.log(this.state);
                          }}
                        />
                      </div>

                      {/* <div className="form-group col-md-6">
                        <label className="control-label">Số lượng</label>
                        <input
                          className="form-control"
                          type="number"
                          value={this.state.addtitem.quanity}
                          onChange={(e) => {
                            this.setState({
                              addtitem: {
                                ...this.state.addtitem,
                                quanity: e.target.value,
                              },
                            });
                            console.log(this.state);
                          }}
                        />
                      </div> */}
                      {/* <div className="form-group col-md-6">
                        <label
                          htmlFor="exampleSelect1"
                          className="control-label"
                        >
                          Tình trạng
                        </label>
                        <select className="form-control" id="exampleSelect1">
                          <option>-- Chọn tình trạng --</option>
                          <option>Còn hàng</option>
                          <option>Hết hàng</option>
                        </select>
                      </div> */}
                      <div className="form-group col-md-6">
                        <label
                          htmlFor="exampleSelect1"
                          className="control-label"
                        >
                          Category
                        </label>
                        <select
                          class="form-control"
                          id="exampleSelect1"
                          onChange={(e) => {
                            this.setState({
                              addtitem: {
                                ...this.state.addtitem,
                                cmbCategory: e.target.value,
                              },
                            });
                          }}
                        >
                          <option>CHOOSE</option>
                          {catesadd}
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label className="control-label">Price</label>
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.addtitem.txtPrice}
                          onChange={(e) => {
                            this.setState({
                              addtitem: {
                                ...this.state.addtitem,
                                txtPrice: e.target.value,
                              },
                            });
                            console.log(this.state);
                          }}
                        />
                      </div>
                      {/* <div className="form-group col-md-6">
                        <label className="control-label">Giá vốn</label>
                        <input className="form-control" type="text" />
                      </div> */}
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
                          {this.state.addtitem.imgProduct && (
                            // eslint-disable-next-line jsx-a11y/img-redundant-alt
                            <img
                              height="250"
                              width="300"
                              alt="Thumb image"
                              id="thumbimage"
                              src={this.state.addtitem.imgProduct}
                            />
                          )}
                        </div>
                        <div id="boxchoice">
                          <p></p>
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <label className="control-label">
                          Product Decription
                        </label>
                        <textarea
                          className="form-control"
                          name="mota"
                          id="mota"
                          value={this.state.addtitem.decription}
                          onChange={(e) => {
                            this.setState({
                              addtitem: {
                                ...this.state.addtitem,
                                decription: e.target.value,
                              },
                            });
                            console.log(this.state);
                          }}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <button
                    className="btn btn-save"
                    type="button"
                    onClick={(e) => this.btnAddClick(e)}
                  >
                    SAVE
                  </button>
                  <button
                    class="btn btn-cancel"
                    type="button"
                    onClick={() => this.screen0()}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {this.state.screen === 2 ? (
          <div className="addnewProduct">
            <div className="row small-component ">
              <div className="col-sm-6">
                <div className="tile">
                  <h3 className="tile-title">EDIT PRODUCT</h3>
                  <div className="tile-body">
                    <div className="row element-button">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-4"></div>
                      <div className="col-sm-4"></div>
                    </div>
                    <form className="row">
                      <div className="form-group col-md-6">
                        <label className="control-label">Product Name</label>
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.itemSelected.name}
                          onChange={(e) => {
                            this.setState({
                              itemSelected: {
                                ...this.state.itemSelected,
                                name: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>

                      {/* <div className="form-group col-md-6">
                        <label className="control-label">Số lượng</label>
                        <input
                          className="form-control"
                          type="number"
                          value={this.state.addtitem.quanity}
                          onChange={(e) => {
                            this.setState({
                              addtitem: {
                                ...this.state.addtitem,
                                quanity: e.target.value,
                              },
                            });
                            console.log(this.state);
                          }}
                        />
                      </div> */}
                      {/* <div className="form-group col-md-6">
                        <label
                          htmlFor="exampleSelect1"
                          className="control-label"
                        >
                          Tình trạng
                        </label>
                        <select className="form-control" id="exampleSelect1">
                          <option>-- Chọn tình trạng --</option>
                          <option>Còn hàng</option>
                          <option>Hết hàng</option>
                        </select>
                      </div> */}
                      <div className="form-group col-md-6">
                        <label
                          htmlFor="exampleSelect1"
                          className="control-label"
                        >
                          Category
                        </label>
                        <select
                          class="form-control"
                          id="exampleSelect1"
                          onChange={(e) => {
                            this.setState({
                              itemSelected: {
                                ...this.state.itemSelected,
                                category: e.target.value,
                              },
                            });
                          }}
                        >
                          {catessave}
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label className="control-label">Price</label>
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.itemSelected.price}
                          onChange={(e) => {
                            this.setState({
                              itemSelected: {
                                ...this.state.itemSelected,
                                price: e.target.value,
                              },
                            });
                            console.log(this.state);
                          }}
                        />
                      </div>
                      {/* <div className="form-group col-md-6">
                        <label className="control-label">Giá vốn</label>
                        <input className="form-control" type="text" />
                      </div> */}
                      <div className="form-group col-md-12">
                        <label className="control-label">Product Image</label>
                        <div id="myfileupload">
                          <input
                            type="file"
                            id="uploadfile"
                            name="ImageUpload"
                            onChange={this.handleFileChange2}
                          />
                        </div>
                        <br></br>
                        <div id="thumbbox">
                          <img
                            src={this.state.itemSelected.image}
                            width="300px"
                            height="300px"
                            alt="aaaaaaaaaaa"
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-12">
                        <label className="control-label">
                          Product Decription
                        </label>
                        <textarea
                          className="form-control"
                          name="mota"
                          id="mota"
                          value={this.state.itemSelected.decription}
                          onChange={(e) => {
                            this.setState({
                              itemSelected: {
                                ...this.state.itemSelected,
                                decription: e.target.value,
                              },
                            });

                            console.log(this.state.itemSelected);
                          }}
                        ></textarea>
                      </div>
                    </form>
                  </div>
                  <button
                    className="btn btn-save"
                    type="button"
                    onClick={(e) => this.btnUpdateClick(e)}
                  >
                    SAVE
                  </button>
                  <button
                    class="btn btn-cancel"
                    type="button"
                    onClick={() => this.screen0()}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
  //////////
  screen0 = () => {
    this.setState({ screen: 0 });
  };
  screen1 = () => {
    this.setState({
      addtitem: {
        txtName: "",
        // quanity: 0,
        txtPrice: 0,
        // tatus: "",
        cmbCategory: "",
        imgProduct: "",
      },
    });
    this.setState({ screen: 1 });
  };
  screen2 = () => {
    this.setState({ screen: 2 });
  };
  handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgSrc = e.target.result;
      this.setState({
        addtitem: { ...this.state.addtitem, imgProduct: imgSrc },
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ addtitem: { ...this.state.addtitem, imgProduct: null } }); // Hoặc bạn có thể đặt giá trị mặc định khác ở đây
    }
  };

  handleFileChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgSrc = e.target.result;
      this.setState({
        itemSelected: { ...this.state.itemSelected, image: imgSrc },
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ addtitem: { ...this.state.addtitem, imgProduct: null } });
      // Hoặc bạn có thể đặt giá trị mặc định khác ở đây
    }
  };
  ////////////
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.addtitem.txtName;
    const price = parseInt(this.state.addtitem.txtPrice);
    const category = this.state.addtitem.cmbCategory;
    const image = this.state.addtitem.imgProduct.replace(
      /^data:image\/[a-z]+;base64,/,
      ""
    ); // remove "data:image/...;base64,"
    const decription = this.state.addtitem.decription;
    if (name && price && category && image && decription) {
      const prod = {
        name: name,
        price: price,
        category: category,
        image: image,
        decription: decription,
      };
      this.apiPostProduct(prod);
    } else {
      alert("Please input name and price and category and image");
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.itemSelected.id;
    const name = this.state.itemSelected.name;
    const price = parseInt(this.state.itemSelected.price);
    const category = this.state.itemSelected.category;
    const image = this.state.itemSelected.image.replace(
      /^data:image\/[a-z]+;base64,/,
      ""
    ); // remove "data:image/...;base64,"
    const decription = this.state.itemSelected.decription;
    if (id && name && price && category && image && decription) {
      const prod = {
        name: name,
        price: price,
        category: category,
        image: image,
        decription: decription,
      };
      this.apiPutProduct(id, prod);
    } else {
      alert("Please input id and name and price and category and image");
    }
  }
  btnDeleteClick(e, id) {
    e.preventDefault();
    if (window.confirm("ARE YOU SURE?")) {
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert("Please input id");
      }
    }
  }
  ////////////////////api
  apiPostProduct(prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.post("/api/admin/products", prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY!");
        this.apiGetProducts(this.state.curPage);
        this.screen0();
        this.setState({
          addtitem: {
            txtName: "",
            txtPrice: 0,
            cmbCategory: "",
            imgProduct: "",
            decription: "",
          },
        });
      } else {
        alert("SORRY BABY!");
      }
    });
  }

  //////////////////////
  updateProducts = (products, noPages) => {
    // arrow-function
    this.setState({ products: products, noPages: noPages });
  };
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
    this.apiGetCategories();
  }
  // event-handlers
  lnkPageClick(index) {
    console.log(index);
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({
      itemSelected: {
        id: item._id,
        name: item.name,
        price: item.price,
        category: item.category,
        image: "data:image/jpg;base64," + item.image,
        decription: item.decription,
      },
    });
    console.log(this.state.itemSelected);
  }

  // apis
  apiGetProducts(page) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/products?page=" + page, config).then((res) => {
      const result = res.data;
      this.setState({
        products: result.products,
        noPages: result.noPages,
        curPage: result.curPage,
      });
    });
  }
  apiGetProducts2() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/admin/products?page=" + this.state.curPage, config)
      .then((res) => {
        const result = res.data;
        if (result.products.length !== 0) {
          this.updateProducts(result.products, result.noPages);
        } else {
          axios
            .get("/api/admin/products?page=" + (this.state.curPage - 1), config)
            .then((res) => {
              const result = res.data;
              this.updateProducts(result.products, result.noPages);
            });
        }
      });
  }
  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/categories", config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/products/" + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY!");
        this.apiGetProducts(this.state.curPage);
        this.screen0();
      } else {
        alert("SORRY BABY!");
      }
    });
  }
  apiDeleteProduct(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.delete("/api/admin/products/" + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("OK BABY!");
        this.apiGetProducts2();
      } else {
        alert("SORRY BABY!");
      }
    });
  }
}
export default Product;
