const express = require('express')
const {
    getTenants,
    getTenant,
    createTenant,
    deleteTenant,
    updateTenant
} = require('../controllers/tenantController')

const router = express.Router()

//GET all tenants
router.get('/', getTenants)

//GET single tenant
router.get('/:tenant_ID', getTenant)

//POST new tenant
router.post('/', createTenant)

//DELETE new tenant
router.delete('/:tenant_ID', deleteTenant)

//UPDATE tenant
router.put('/:tenant_ID', updateTenant)

module.exports = router