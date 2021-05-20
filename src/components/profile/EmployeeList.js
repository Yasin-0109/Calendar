import React from "react"
import { Table, Form, Button, Input, Popconfirm, Drawer } from "antd"
import 'antd/dist/antd.css';

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    name: `Edward King ${i}`
  });
}

class EmployeeList extends React.Component {
    constructor() {
        super();
        this.state = {
            filterTable: null,
            visible: false,
            employeelist: [],
            content: false,
            drawerTitle: '',
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                },
                {
                    title: 'actions',
                    key: 'actions',
                    render: (record) => {
                        return (
                            <Popconfirm title="Sure to delete?" onConfirm={(e) => {
                                e.stopPropagation();
                                this.remove(record.name)
                            }}>
                                <a type="link" onClick={(e) => {
                                    e.stopPropagation();
                                }}>Delete</a>
                            </Popconfirm>
                        )
                    }
                },
            ]
        };
    }

    formRef = React.createRef();


    submit = (values) => {
            this.setState({
                baseData: [...this.state.baseData, { name: values.Company.name }]
            });
    };

    register = values => {
            alert("Succesfully Regitered User")
            this.formRef.current.resetFields();
            this.hide()
    }

    remove = (id) => {
        this.setState({
            baseData: this.state.baseData.filter(item => item.name !== id)
        })
    }

    search = value => {
        //const { data } = this.state;
        console.log("PASS", { value });

        const filterTable = data.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );

        this.setState({ filterTable });
    };

    showAdd = () => {
        this.setState({
            visible: true,
            content: false,
            drawerTitle: 'Add Employee'
        });
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { filterTable, columns, visible, drawerTitle, employeelist } = this.state;
        return (
            <div>
                <Drawer title={drawerTitle} visible={visible}
                    onCancel={this.hide}
                    onClose={this.hide}
                    width={500}
                >
                        <Form onFinish={this.submit} ref={this.formRef} layout="vertical">
                            <Form.Item name={['Employee', 'name']} label="Company name">
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                </Drawer>
                <Button onClick={this.showAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add
                </Button>
                <Input.Search
                    placeholder="Search by..."
                    enterButton
                    onSearch={this.search}
                />
                <Table
                    columns={columns}
                    dataSource={filterTable == null ? data : filterTable}
                    onRow={record => ({ onClick: () => this.props.history.push(`/employees/${record.name}`) })}
                    scroll={{ x: 400 }}
                />
            </div>
        );
    }
}

export default EmployeeList;