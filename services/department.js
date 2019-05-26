/* eslint-disable no-return-await */
import models from '../models'

const { department } = models

async function findDepartment (id) {
  return await department.findOne({ where: { department_id: id } })
}

async function findAllDepartments () {
  return await department.findAll()
}

export default {
  findDepartment,
  findAllDepartments
}
