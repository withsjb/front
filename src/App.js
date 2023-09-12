import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Secret from "./pages/Secret";
import "react-toastify/dist/ReactToastify.css";
import Problem from "./pages/problem";
import Linuxproblem from "./pages/Linuxproblem";
import Windowproblem from "./pages/Windowproblem";
import Getquestion from "./component/admin/getquestion";
import Quizmain from "./pages/Quizmain";
import Quiz from "./component/problem/Quiz";
import Result from "./component/problem/Result";
import Page2 from "./pages/page2";
import Mainpage from "./pages/mainpage";
import Roadmap from "./pages/roadmap";
import Linuxstudy from "./pages/Linuxstudy";
import Roadmapdetail from "./component/Roaddetail/Roaddetail";
import Roaddetaila from "./component/Roaddetail/Roaddetaila";
import Roaddetailb from "./component/Roaddetail/Roaddetailb";
import Roaddetailc from "./component/Roaddetail/Roaddetailc";
import Roaddetaild from "./component/Roaddetail/Roaddetaild";
import Navbar from "./component/Navbar";
import Slidemain from "./component/Slidemain";
import Modal from "./component/Modal";
import Book from "./component/Book";
import Libook from "./component/Libook";
import Modalknow from "./component/Modalknow";
import Side from "./component/Side";
import Page from "./component/Page";
import Select from "./pages/select/select";
import AddProblem from "./component/problem/AddProblem";
import Changeproblem from "./component/problem/changeproblem";
import { CheckUserExist } from "./helper/helper";
import Test from "./pages/test";

import Termadd from "./pages/termadd";
import Linux from "./pages/Linux";
import Window from "./pages/Window";
import WinFileDetail from "./component/winfiledetail";
import FileDetail from "./component/Filedetail";
import Dashboard from "./pages/dashboard";
import TestBed from "./pages/TestBed";
import Board from "./pages/Board";
import BoardDetail from "./component/Board/Boarddetail";
import PostDetail from "./component/Board/Postdetail";
import QnABoard from "./pages/QnAboard";
import QnABoardDetail from "./component/Board/QnABoarddetail";
import QnAPostDetail from "./component/Board/QnAPostdetail";
import UserFileDetail from "./component/userstydyfile/UserFiledetail";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Secret />} />
          <Route path="/mainpage" element={<Mainpage />}></Route>
          <Route path="/linuxproblem" element={<Linuxproblem />}></Route>
          <Route path="/windowproblem" element={<Windowproblem />}></Route>
          <Route path="/getquestion" element={<Getquestion />}></Route>
          <Route path="/quizmain" element={<Quizmain />}></Route>

          <Route
            path="/quiz"
            element={
              <CheckUserExist>
                {" "}
                <Quiz />{" "}
              </CheckUserExist>
            }
          ></Route>
          <Route
            path="/result"
            element={
              <CheckUserExist>
                {" "}
                <Result />{" "}
              </CheckUserExist>
            }
          ></Route>
          <Route path="/problem" element={<Problem />}></Route>
          <Route path="/addproblem" element={<AddProblem />}></Route>
          <Route path="/changeproblem" element={<Changeproblem />}></Route>
          <Route path="/page2" element={<Page2 />}></Route>
          <Route path="/linuxstudy" element={<Linuxstudy />}></Route>
          <Route path="/roadmap" element={<Roadmap />}></Route>
          <Route path="/roadmapdetail" element={<Roadmapdetail />}></Route>
          <Route path="/roaddetaila" element={<Roaddetaila />}></Route>
          <Route path="/roaddetailb" element={<Roaddetailb />}></Route>
          <Route path="/roaddetailc" element={<Roaddetailc />}></Route>
          <Route path="/roaddetaild" element={<Roaddetaild />}></Route>
          <Route path="/header" element={<Navbar />}></Route>
          <Route path="/slidemain" element={<Slidemain />}></Route>
          <Route path="/Modal" element={<Modal />}></Route>
          <Route path="/book" element={<Book />}></Route>
          <Route path="/libook" element={<Libook />}></Route>
          <Route path="/modalknow" element={<Modalknow />}></Route>
          <Route path="/side" element={<Side />}></Route>
          <Route path="/page" element={<Page />}></Route>
          <Route path="/select" element={<Select />}></Route>

          <Route path="/termadd" element={<Termadd />}></Route>
          <Route path="/linux" element={<Linux />}></Route>
          <Route path="/window" element={<Window />}></Route>
          <Route path="/linux/:fileId" element={<FileDetail />} />
          <Route path="/linux/user/:fileId" element={<UserFileDetail />} />

          <Route path="/window/:fileId" element={<WinFileDetail />} />
          <Route path="/testbed" element={<TestBed />}></Route>
          <Route exact path="/board" element={<Board />} />
          <Route exact path="/boarddetail" element={<BoardDetail />} />
          <Route exact path="/postdetail/:id" element={<PostDetail />} />
          <Route exact path="/qnaboard" element={<QnABoard />} />
          <Route exact path="/qnaBoarddetail" element={<QnABoardDetail />} />
          <Route exact path="/qnaPostdetail/:id" element={<QnAPostDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
