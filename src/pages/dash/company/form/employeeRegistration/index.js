import React, { useEffect, useState } from 'react';
import {
  Box
} from '@material-ui/core';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Form,
  Button
} from "react-bootstrap";
import { useAlert } from "react-alert";
import { postRegisterEmployee } from '../../../../../api/employee';
import { AiOutlineHome } from 'react-icons/ai';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";
import styles from './styles.module.css';
import Reload from '../../../../../components/Reload';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { safeAccess } from '../../../../../services/misc';
import UploadImg from '../../../../../components/UploadImg';
import {
  validateCpf,
  validateEmail,
} from '../../../../../services/validation';
function InputEmployee(props) {
  const {
    userCompany
  } = props;

  const alert = useAlert();
  const history = useHistory();
  const [name, setName] = useState('');
  const [cpfOrCnpj, setCpfOrCnpj] = useState('');
  const [numberPis, setNumberPis] = useState('');
  const [dtBirth, setDtbirth] = useState('');
  const [dtAdmission, setDtAdmission] = useState('');
  const [nmSetor, setNmSetor] = useState('');
  const [nmOffice, setNmOffice] = useState('');
  const [descriptionActivity, setDescriptionActivity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [imgMaterial, setImgMaterial] = useState('');
  const [errorTitlePhoto, setErrorTitlePhoto] = useState('');
  const [errorShowPhoto, setErrorShowPhoto] = useState('');
  const [reload, setReload] = useState(false);



  useEffect(() => {
    if (errorShowPhoto === true) {
      alert.error(errorTitlePhoto)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorShowPhoto])

  const [erroCNPJ, setErroCNPJ] = useState(false);
  const [erronumberPis, setErronumberPis] = useState(false);
  const [erroname, setErroname] = useState(false);
  const [errodtBirth, setErrodtBirth] = useState(false);
  const [errodtAdmission, setErrodtAdmission] = useState(false);

  const [erronmSetor, setErronmSetor] = useState(false);
  const [erronmOffice, setErronmOffice] = useState(false);
  const [errophone, setErrophone] = useState(false);
  const [erroemail, setErroemail] = useState(false);
  const [errondescriptionActivity, setErrodescriptionActivity] = useState(false);


  const handlerCreated = async () => {
    let validation = 0;


    if (!validateCpf(cpfOrCnpj)) {
      setErroCNPJ(true)
      validation = validation + 1;
    } else {
      setErroCNPJ(false)
    }

    if (numberPis.length < 6) {
      setErronumberPis(true)
      validation = validation + 1;
    } else {
      setErronumberPis(false)
    }

    if (name.length < 7) {
      setErroname(true)
      validation = validation + 1;
    } else {
      setErroname(false)
    }

    if (dtBirth.length < 4) {
      setErrodtBirth(true)
      validation = validation + 1;
    } else {
      setErrodtBirth(false)
    }

    if (dtAdmission.length < 4) {
      setErrodtAdmission(true)
      validation = validation + 1;
    } else {
      setErrodtAdmission(false)
    }

    if (nmSetor.length < 3) {
      setErronmSetor(true)
      validation = validation + 1;
    } else {
      setErronmSetor(false)
    }

    if (nmOffice.length < 3) {
      setErronmOffice(true)
      validation = validation + 1;
    } else {
      setErronmOffice(false)
    }
    if (phone.length < 11) {
      setErrophone(true)
      validation = validation + 1;
    } else {
      setErrophone(false)
    }
    if (!validateEmail(email)) {
      setErroemail(true)
      validation = validation + 1;
    } else {
      setErroemail(false)
    }

    if (descriptionActivity.length < 10) {
      setErrodescriptionActivity(true)
      validation = validation + 1;
    } else {
      setErrodescriptionActivity(false)
    }

    if (validation > 0) {
      return
    }

    setReload(true)
    let dateValue = {
      "name": name,
      "cpfOrCnpj": cpfOrCnpj,
      "numberPis": numberPis,
      "dtBirth": dtBirth,
      "dtAdmission": dtAdmission,
      "nmSetor": nmSetor,
      "nmOffice": nmOffice,
      "descriptionActivity": descriptionActivity,
      "phone": phone,
      "email": email,
      "ds_imagem": imgMaterial,
      "cd_empresa": userCompany.cd_empresa
    }

    const result = await postRegisterEmployee(
      dateValue
    )

    if (result.status === 200) {
      setReload(false)
      history.push('/empresa/colaborador')
    } else if (result.status === 409) {
      setReload(false)
      alert.error("Esse funcionário já está cadastrado!")
    } else {
      setReload(false)
      alert.error("erro inesperado, tente novamente mais tarde")
    }
  }
  return (

    <Container fluid style={{ padding: 20 }} >
      <Card style={{ padding: 40 }} >
        <h3> {userCompany.name} </h3>
        <Breadcrumb>
          <AiOutlineHome style={{ marginRight: 10 }} />
          <Breadcrumb.Item href="empresa/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="empresa/home">Cadastro de funcionarios</Breadcrumb.Item>
        </Breadcrumb>

        <Box
          component="form"
          sx={{ display: 'flex', flexWrap: 'wrap' }}
          noValidate
          autoComplete="off"
          style={{ marginTop: 40 }}
        >


          <Row>

            <UploadImg
              setErrorTitlePhoto={setErrorTitlePhoto}
              setErrorShowPhoto={setErrorShowPhoto}
              img={imgMaterial}
              setImg={setImgMaterial}
              title={"Carregue uma foto do funcionário"}
              subTitle={"EDITAR IMAGEM"}
            />

            <br></br><br></br><br></br><br></br><br></br>

            <Col sm={4} className={styles.Spacing} >
              <Form.Label>Nome do funcionário</Form.Label>
              <Form.Control size="lg" type="text" placeholder="..."
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                isInvalid={erroname}
              />
              {erroname && (
                <p style={{ color: 'red', marginTop: 5 }}>Nome inválido</p>
              )}
            </Col>
            <Col xs={4} className={styles.Spacing}>

              <Form.Label>Digite um CPF</Form.Label>
              <CpfCnpj
                className={styles.cpfCnpj}
                placeholder="...."
                value={cpfOrCnpj}
                onChange={(event, type) => {
                  setCpfOrCnpj(event.target.value);
                  //setMask(type === "CPF");
                }}
                style={{ borderColor: erroCNPJ ? 'red' : '', borderWidth: erroCNPJ ? 3 : '' }}
              />
              {erroCNPJ && (
                <p style={{ color: 'red', marginTop: 5 }}>CPF inválido</p>
              )}
            </Col>

            <Col sm={4} className={styles.Spacing}>
              <Form.Label>Número do PIS</Form.Label>
              <Form.Control size="lg" type="text" placeholder="..."
                value={numberPis}
                onChange={(event) => {
                  setNumberPis(event.target.value);
                }}
                isInvalid={erronumberPis}
              />
              {erronumberPis && (
                <p style={{ color: 'red', marginTop: 5 }}>PIS inválido</p>
              )}
            </Col>

            <Col sm={4} className={styles.Spacing}>
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control size="lg" placeholder="..."
                value={dtBirth}
                type="date"
                onChange={(event) => {
                  setDtbirth(event.target.value);
                }}
                isInvalid={errodtBirth}
              />
              {errodtBirth && (
                <p style={{ color: 'red', marginTop: 5 }}>Data de nascimento inválido</p>
              )}
            </Col>

            <Col sm={4} className={styles.Spacing}>
              <Form.Label>Data de adimição na empresa</Form.Label>
              <Form.Control size="lg"
                type="date"
                placeholder="..."
                value={dtAdmission}
                onChange={(event) => {
                  setDtAdmission(event.target.value);
                }}
                isInvalid={errodtAdmission}
              />
              {errodtAdmission && (
                <p style={{ color: 'red', marginTop: 5 }}>Data de adimição inválido</p>
              )}
            </Col>

            <Col sm={4} className={styles.Spacing}>
              <Form.Label>Nome do setor</Form.Label>
              <Form.Control size="lg" type="text" placeholder="..."
                value={nmSetor}
                onChange={(event) => {
                  setNmSetor(event.target.value);
                }}
                isInvalid={erronmSetor}
              />
              {erronmSetor && (
                <p style={{ color: 'red', marginTop: 5 }}>Setor inválido</p>
              )}
            </Col>

            <Col sm={4} className={styles.Spacing}>
              <Form.Label>Nome do cargo</Form.Label>
              <Form.Control size="lg" type="text" placeholder="..."
                value={nmOffice}
                onChange={(event) => {
                  setNmOffice(event.target.value);
                }}
                isInvalid={erronmOffice}
              />
              {erronmOffice && (
                <p style={{ color: 'red', marginTop: 5 }}>Cargo inválido</p>
              )}
            </Col>

            <Col sm={4} className={styles.Spacing}>
              <Form.Label>Descrição das atividades</Form.Label>
              <Form.Control size="lg" type="text" placeholder="..."
                value={descriptionActivity}
                onChange={(event) => {
                  setDescriptionActivity(event.target.value);
                }}
                isInvalid={errondescriptionActivity}
              />
              {errondescriptionActivity && (
                <p style={{ color: 'red', marginTop: 5 }}>Descreva a atividade do funcionário</p>
              )}
            </Col>

            <Col sm={4} className={styles.Spacing}>
              <Form.Label>Telefone</Form.Label>
              <Form.Control size="lg" type="text" placeholder="..."
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                isInvalid={errophone}
              />
              {errophone && (
                <p style={{ color: 'red', marginTop: 5 }}>Cargo inválido</p>
              )}
            </Col>

            <Col sm={4} className={styles.Spacing}>
              <Form.Label>Email</Form.Label>
              <Form.Control size="lg" type="text" placeholder="..."
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                isInvalid={erroemail}
              />
              {erroemail && (
                <p style={{ color: 'red', marginTop: 5 }}>Email inválido</p>
              )}
            </Col>

            <Col xs={12}>
              <Button className="btnEdit" onClick={() => handlerCreated()}>Cadastrar</Button>
            </Col>
          </Row>
          {/* </FormControl> */}
        </Box>

      </Card>

      {reload && (
        <Reload />
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userCompany: safeAccess(state, ['userDataCompanyReduecer', 'data'], undefined),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(InputEmployee);
