import React from 'react';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const ScheaduleForm = () => {

    return (
        <div>
            <Form.Item name={['Schedule', 'name']} label="Employee">
                <Select mode="multiple">
                    <Option value="John">John</Option>
                    <Option value="Michael">Michael</Option>
                    <Option value="Mary">Mary</Option>
                    <Option value="Susan">Susan</Option>
                    <Option value="Lars">Lars</Option>
                </Select>
            </Form.Item>
            <Form.Item name={['Schedule', 'title']} label="Title">
                <Input />
            </Form.Item>
            <Form.Item name={['Schedule', 'type']} label="Type" >
                <Select>
                    <Option value="1">Task</Option>
                    <Option value="2">Meeting</Option>
                    <Option value="3">Training</Option>
                </Select>
            </Form.Item>
            <Form.Item name={['Schedule', 'description']} label="Description">
                <Input />
            </Form.Item>
            <Form.Item name={['Schedule', 'start']} label="Start">
                <Input type="datetime-local" />
            </Form.Item>
            <Form.Item name={['Schedule', 'end']} label="End" >
                <Input type="datetime-local" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                                </Button>
            </Form.Item>
        </div>
    );
};


export default ScheaduleForm;