const block = require('./Block')
const ProductChain = require('../schema/ProductChain');

const addblock = async (newProduct) => {
  const { companyName, P_ID, stage } = newProduct;

  ProductChain.find({ companyName: companyName }, async function (err, result) {
    if (result && result.length === 0) {
      let newProductChain = {};
      newProductChain.companyName = companyName;
      newProductChain.prod = block.genesis();
      let productChain = new ProductChain(newProductChain);

      productChain.save()
        .then(data => {
          newProduct.comment = 'Genesis created'
          // console.log("Product Chain: " + data + " registered!")
        }).catch(err => {
          console.error(error)
        });
    }
    else {
      let previousProductIds = [];

      result.map(item => {
        previousProductIds = item.prod.map(product => {
          return product.P_ID
        })
      })

      let hash = [];
      result.map(item => {
        hash = item.prod.map(product => {
          return product.hash
        })
      })

      let last_hash = [];
      result.map(item => {
        last_hash = item.prod.map(product => {
          return product.lasthash
        })
      })

      let stages = [];
      result.map(item => {
        stages = item.prod.map(product => {
          return product.stage
        })
      })

      const valid_stage = stagecheck(P_ID, previousProductIds, stages, stage)
      const array_length = last_hash.length - 1
      const isValid = validchain(previousProductIds, hash, last_hash)

      newProduct.timestamp = Date.now()
      newProduct.hash = block.hash(Date.now(), hash[array_length], P_ID)
      newProduct.lasthash = hash[array_length]

      if (isValid) {
        if (!previousProductIds.includes(P_ID)) {
          ProductChain.update(
            { companyName: companyName },
            { "$push": { "prod": newProduct } },
            function (err, raw) {
              if (err) console.log(err);
              newProduct.comment = 'Product Chain updated'
              // console.log('Updated product chain is ', raw);
            }
          )
        } else if (previousProductIds.includes(P_ID) && valid_stage) {
          ProductChain.update(
            { companyName: companyName },
            { "$push": { "prod": newProduct } },
            function (err, raw) {
              if (err) console.log(err);
              newProduct.comment = 'Product Chain updated'
              // console.log('Updated product chain is ', raw, '\nIts components are' + newProduct);
            }
          )
        } else {
          newProduct.comment = 'Product already exists in Product chain of this Company'
          // await mail.run_mail('Warning','Product already exists in Product chain of this Company')
          // console.log("Product already exists in Product chain of this Company")
        }
      }
    }
  })
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(newProduct), 1000)
  })
}

const run_addblock = async (newProduct) => {
  const res = await addblock(newProduct)
  // console.log(res)
  return res
}

const getchain = async (companyName, P_ID) => {
  let jsonobj = {
    "name": "",
    "companyName": "",
    "P_ID": "",
    "manufacturingDate": "",
    "expiryDate": "",
    "stage": "",
    "timestamp": "",
    "hash": "",
    "lasthash": ""
  }

  ProductChain.find({ companyName: companyName }, function (err, result) {
    // const callback = {}
    if (result && result.length === 0) {
      // console.log('No Company found')
    } else {
      let previousProductIds = []
      result.map(item => {        
        previousProductIds = item.prod.map(product => {
          
          const ter = product.P_ID
          if (ter === P_ID) {
            const infoname = product.name
            const infocompanyname = product.companyName
            const infopid = product.P_ID
            const infomanufacturingdate = product.manufacturingDate
            const infoexpirydate = product.expiryDate
            const infostage = product.stage
            const infotimestamp = product.timestamp
            const infohash = product.hash
            const infolasthash = product.lasthash

            // console.log('---------' + infoname + '0000000' + '1111111' + infotimestamp)

            jsonobj.name = infoname
            jsonobj.companyName = infocompanyname
            jsonobj.P_ID = infopid
            jsonobj.manufacturingDate = infomanufacturingdate
            jsonobj.expiryDate = infoexpirydate
            jsonobj.stage = infostage
            jsonobj.timestamp = infotimestamp
            jsonobj.hash = infohash
            jsonobj.lasthash = infolasthash
            
          }
        })
      })
      // console.log('-----' + JSON.stringify(jsonobj))
    }
  })
  return new Promise((resolve, reject) => {    
    setTimeout(() => resolve(jsonobj), 1000)
  })
}

const run_getchain = async (companyName, P_ID) => {
  console.log(P_ID);
  
  const res = await getchain(companyName, P_ID)
  // console.log(res)
  return res
}

const validchain = (previousProductIds, hash, last_hash) => {
  if (!previousProductIds[0] === 0) {
    //const res= await run_mail('test','test')
    // console.log('-----++++-------++++' + res)
    return false
  }
  const prod_array_length = last_hash.length
  if (!last_hash[prod_array_length - 1] === hash[prod_array_length] && prod_array_length > 1) {
    //const res= await run_mail('test','test')
    return false
  }
  return true
}

const stagecheck = (P_ID, previousProductIds, stages, stage) => {
  const prod_array_length = previousProductIds.length
  let final_stage = []
  for (let i = 0; i < prod_array_length; i++) {
    if (previousProductIds[i] === P_ID) {
      final_stage.push(stages[i])
    }
  }
  for (let i = 0; i < final_stage.length; i++) {
    if (final_stage[i] >= stage) {
      return false
    }
  }
  return true
}

module.exports = {
  run_addblock,
  run_getchain
}
