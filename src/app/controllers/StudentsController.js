import * as Yup from 'yup';

import Students from '../models/Students';

class StudentsController {  
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      idade: Yup.integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentsExists  = await Students.findOne({ where: { email: req.body.email }});

    if (studentsExists) {
      return res.status(400).json({ error: "Students already exists." });
    }

    const { id, name, email, idade, peso, altura } = await Students.create(req.body);

    return res.json({
       id, 
       name,
       email,
       idade,
       peso,
       altura
    });
  }

  async search(req, res) {
    const students = await Students.findAll();
    return res.json(students);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, email, idade, peso, altura } = await Students.update(req.body);

    return res.json({
       id, 
       name,
       email,
       idade, 
       peso,
       altura
    });
  }

  async delete(req, res) {
    Students.delete(req.body);
    return res.status(200).json({ message: "Students delete success." });
  }

}

export default new StudentsController();