import { useHistory } from 'react-router-dom'
//import { toast } from 'react-toastify';
import Select from 'react-select';
import { useState, useEffect } from 'react'
import { Department } from 'types/department'
import { useForm, Controller } from 'react-hook-form';
import { Employee } from 'types/employee';
import { requestBackend } from 'util/requests';
import './styles.css';
import { AxiosRequestConfig } from 'axios';

const Form = () => {

  const history = useHistory();

  const [selectDepartments, setSelectDepartments] = useState<Department[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //setValue,
    control,
  } = useForm<Employee>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/departments',
      withCredentials: true
    }
    requestBackend(params)
      .then((response) => {
        setSelectDepartments(response.data);
      });
  }, []);

  const handleCancel = () => {
    history.push('/admin/employees');
  };

  const onSubmit = () => {
  };

  return (
    <div className="employee-crud-container">
      <div className="base-card employee-crud-form-card">
        <h1 className="employee-crud-form-title">INFORME OS DADOS</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row employee-crud-inputs-container">
            <div className="col employee-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${errors.name ? 'is-invalid' : ''
                    }`}
                  name="name"
                  placeholder='Nome do funcionário'
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('email', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${errors.email ? 'is-invalid' : ''
                    }`}
                  name="email"
                  placeholder='Email do funcionário'
                />
                <div className="invalid-feedback d-block">
                  {errors.email?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <label htmlFor="department" className="d-none">Departamento</label>
                <Controller
                  name="department"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectDepartments}
                      classNamePrefix="department-select"
                      getOptionLabel={(department: Department) => department.name}
                      getOptionValue={(department: Department) =>
                        String(department.id)
                      }
                      inputId="department"
                      placeholder='Departamento'
                    />
                  )}
                />
                {errors.department && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>

            </div>
          </div>
          <div className="employee-crud-buttons-container">
            <button
              className="btn btn-outline-danger employee-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary employee-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
