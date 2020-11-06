import React, { useRef, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import DatePicker from "./components/DatePicker/DatePicker";
// import Video from './components/Videos/Video';
// import Map from './components/Map/Map';
// import Range from './components/Inputs/Range/Range';
//import Form from './components/Forms/Form/Form';
// import ImageSpan from './components/Images/ImageSpan/ImageSpan';
// import ImageGrid from './components/Images/ImageGrid/ImageGrid';
// import Navbar from './components/Navbars/Basic/Navbar';
// import { data } from "./components/SortableList/data/data";
// import SortableList from "./components/SortableList/SortableList";
// import ImageUploader from './components/ImageUploader/ImageUploader';
// import Table from './components/Table/Table';
// import Badge from './components/Badge/Badge';
// import Pagination from './components/Pagination/Pagination';
// import ProgressBar from './components/ProgressBar/ProgressBar';
// import Navbar from './components/Navbars/Responsive/Navbar';
// import Marker from './components/Marker/Marker';
// import Hamburger from './components/Navbars/Hamburger/Hamburger';
// import ImageSlider from './components/ImageSlider/ImageSlider';
// import Wizard from './components/Wizard/Wizard';
// import FileInput from './components/Inputs/File/FileInput';
// import RangeSlider from './components/RangeSlider/RangeSlider';
// import ToggleSwitch from './components/ToggleSwitch/ToggleSwitch';
// import Tooltip from './components/Tooltip/Tooltip';
// import TabPannel from './components/TabPanel/TabPannel';
// import Accordion from './components/Accordion/Accordion';
// import Textarea from './components/Inputs/Textarea/Textarea';
// import Checkbox from './components/Inputs/Checkbox/Checkbox';
// import Select from './components/Inputs/Select/Select';
// import Radio from './components/Inputs/Radio/Radio';
// import TextInput from './components/Inputs/TextInputs/TextInput';
// import BasicInput from './components/Inputs/Inputs/Input/BasicInput';
// import FilledInput from './components/Inputs/Inputs/Input/FilledInput';
// import OutlinedInput from './components/Inputs/Inputs/Input/OutlinedInput';
// import Alert from './components/Alert/Alert';
// import Card from './components/Card/Card';
// import List from './components/List/List';
// import Button from './components/Button/Button';
// import Slide from './components/Effects/Slide/Slide';
// import Fade from './components/Effects/Fade/Fade';
// import Scale from './components/Effects/Scale/Scale';
// import Grow from './components/Effects/Grow/Grow';
// import Form from './components/Forms/Form';
// import Button from './components/Button/Button';
// import Draggable from './components/Draggable/Draggable';
// import Resizable from './components/Resizable/Resizable';
// import Sidebar from './components/Sidebar/Sidebar';
// import Modal from './components/Modals/Modal';
// import Button from './components/Button/Button';
// import DataTable from './components/DataTable/DataTable';
// import { dataModel } from './components/DataTable/DataModel/DataModel';
// import ContextMenu from './components/Menus/ContextMenu/ContextMenu';
// import FoldMenu from './components/Menus/FoldMenu/FoldMenu';
// import Canvas from './components/Canvas/Canvas';
// import Layout from './containers/Layout/Layout';

//Aggiungere CRUD operation alla DataTable e un tableContext
const App = () => {
  const contextMenuRef = useRef(null);
  // const [inState, setInState] = useState(false);
  // const handleEffect = () => {
  //   setInState(!inState);
  // };

  // const [show, setShowSidebar] = useState(true);

  // const toggleSidebar = () => {
  //   setShowSidebar(!show);
  // };

  return (
    <Router>
      <div className="container-fluid" ref={contextMenuRef}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <DatePicker />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

/* <Video /> */

/* <Map center={{ lat: 45.3383023, lng: 11.7753635 }} zoom={16} /> */

/* <Layout>
  <Navbar toggle={toggleSidebar} show={show} />
  <Sidebar toggle={toggleSidebar} show={show} />{' '}
</Layout>; */

/* <Form title="Register User" type="register" withMessage withCheck /> */
/* <ImageSpan /> */
/* <ImageGrid /> */
/* 
const [listData, setData] = useState(data);
<SortableList
data={listData}
onReorder={(ordered) => setData(ordered)}
separator
sortable
/> */
/* <Table pagination pageSize={10} /> */
/* <ImageUploader preview width="50%" height="50%" /> */
/* <Badge content={'5 stars'} /> */
/* <Table pagination pageSize={10} /> */
/* <Pagination count={10} /> */
/* <Navbar height={3.5} /> */
/* <Hamburger type="stand" /> */
/* <Wizard /> */
/* <Button className="btn btn-primary" onClick={handleEffect}>
            Fade In/Out
          </Button> */
/* <Tooltip position="top" label="Tooltip Content">
            <button className="btn btn-primary">BUTTON</button>
          </Tooltip> */
/* <RangeSlider onChange={() => {}} left={0} top={0} />*/
/* <Marker /> */
/* <ProgressBar /> */

//Testare
//---------------------------------------------------------------------
/* <Draggable
          resizable
          width={150}
          height={200}
          top={200}
          left={500}
        ></Draggable> */

//---------------------------------------------------------------------
/* <Resizable
          custom
          topLeft={{ both: true }}
          bottomRight={{ both: true }}
          width={200}
          height={300}
        ></Resizable> */

//---------------------------------------------------------------------
//SIDEBAR
// <Sidebar />

//CUSTOM BUTTON
// <Button className="btn btn-violet" ripple onClick={openModal}>
//   OPEN MODAL
// </Button>

//---------------------------------------------------------------------
//MODAL
// const [showModal, setShowModal] = useState(false);
// const openModal = () => {
//   setShowModal(true);
// };
// const closeModal = () => {
//   setShowModal(false);
// };
// <Modal
//   showModal={showModal}
//   close={closeModal}
//   timeout={500}
//   header="Modal Header"
// >
//   Modal Body
// </Modal>

//---------------------------------------------------------------------
//DATA TABLE
// const [tableState, setTableState] = useState(dataModel);

// const onUpdateTable = (field, id, value) => {
//   const updateData = [...tableState.data];
//   const updateRow = updateData.find((cell) => cell.id === id);
//   updateRow[field] = value;
//   setTableState({ ...tableState, data: updateData });
// };
//  <DataTable
//         headers={tableState.headers}
//         data={tableState.data}
//         edit={true}
//         className="data-table"
//         title="Table Title"
//         keyField="id"
//         pagination={{ enable: true, pageLength: 5, type: 'long' }}
//         width="100%"
//         noData="No Records!"
//         onUpdate={onUpdateTable}
//       />

//---------------------------------------------------------------------
//CONTEXT MENU
/* <ContextMenu outerRef={menuRef} /> */
//FOLD MENU
/* <FoldMenu /> */

//---------------------------------------------------------------------
//FORM AGGIUNGERE CLIENT VALIDATION ecc..
/* <Form
draggable
resizable
top={100}
left={100}
header={<h2>Material Form</h2>}
footer={
  <Button className="btn btn-primary" ripple>
    SUBMIT
  </Button>
}
/> */

//---------------------------------------------------------------------
//BASIC LIST ITEMS WITH TRANSITION EFFECT
/* <List /> */

//---------------------------------------------------------------------
//FADE EFFECT
// const [inState, setInState] = useState(false);
// const handleEffect = () => {
//   setInState(!inState);
// };
/* <Button className="btn btn-primary" onClick={handleEffect}>
Fade In/Out
</Button>
<Fade in={inState}></Fade>  */
/* <Slide in={inState}></Slide> */

//----------------------------------------------
//Basic CARD
//<Card ripple></Card>

//----------------------------------------------
//BASIC ALERT MESSAGE
/* 
const [error, setError] = useState(false);
const showAlert = () => {
  setError(true);
};
const hideAlert = () => {
  setError(false);
};

<Button className="btn btn-primary" onClick={showAlert}>SHOW ALERT</Button>
<Alert
error={error}
message={'An Error Happen'}
className="alert-danger"
hideAlert={hideAlert}
/> 
*/

//----------------------------------------------
/*CUSTOM MATERIAL UI TEXT INPUTS
<BasicInput onChange={() => {}} />
<FilledInput onChange={() => {}} />
<OutlinedInput onChange={() => {}} /> 
const colors = ['Green', 'Blue',  'Violet',  'Red',  'Yellow',  'Chian',  'Pink',  'Orange',];
//INPUT VARI TESTARE
<TextInput onChange={() => {}} label="Input" />
<Radio label="Radio Button" onChange={() => {}} ripple hover />
<Select  options={colors}  label="Select Input"  onChange={() => {}}  filterable  sortable/>
<Checkbox label="Checkbox" onChange={() => {}} ripple hover />
<Textarea label="Textarea" onChange={() => {}} />
*/

//----------------------------------------------
//Basic Accordion
//<Accordion items={{}} />

//----------------------------------------------
//Basic Tab Pannel
//<TabPannel highlighter />

//----------------------------------------------
//Simple Tooltip
/* 
<Tooltip position="top" label="Tooltip Component">
<button className="btn btn-primary">BUTTON</button>
</Tooltip>
<Tooltip position="bottom" label="Tooltip Component">
<button className="btn btn-primary">BUTTON</button>
</Tooltip>
<Tooltip position="left" label="Tooltip Component">
<button className="btn btn-primary">BUTTON</button>
</Tooltip>
<Tooltip position="right" label="Tooltip Component">
<button className="btn btn-primary">BUTTON</button>
</Tooltip> 
*/

//----------------------------------------------
//Image Slider
/* <ImageSlider slides={images} autoPlay={4} /> */
// const images = [
//   "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
//   "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
//   "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
//   "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
// ];
