/*

companies
  { 
    id
	name 
    address 
	house_no 
	country enum [country codes]
	state
	phone 
	postal_code 
	tax_number 
	email
	store_no 
	stores: {
	          name
			  address
			  postal_code
			  tax_number
			  status
			  cashiers : {
			               cashierId (ObjectId)
						   description
						   status
						 }
			}
    applications: {
	                applicationId (ObjectId)
				  }
	status
	create_date 
	modified_date
  }

taxes
  {
    id
	name
	percentage
	include_tax
	status
	companie (ObjectId)
	create_date
	modified_date
  }

products 
  {
    id
	name
	type enum [good, service]
	unit_price
	unit_cost
	qty
	img_path
	companyId (ObjectId)
	status
	create_date
	modified_date
  }

applications
  {
    id
    name
	icon
	status
	create_date
	modified_date
  }

customers
  {
    id
	name
	address
	house_no
	country
	state
	phone
	postal_code
	tax_number
	is_exent
	reason
	email
	status
	create_date
	modified_date
  }

invoices
  {  
    id
	invoice_Id
	status
	payment_status
	payment_auth
	payment_date
	invoice_date
	userId: ObjectId
	companyId: ObjectId
	total
	total_taxes
	total_discount
    customer : {
	             id
				 name
				 address
				 house_no
				 country
				 state
				 phone
				 postal_code
				 tax_number
				 is_excent
				 reason
				 email
	           }
    invoice_details: [
      {
	    line_no
	    product_id
	    name
	    unit_price
	    type enum [good, service]
	    togo
	    delivery_date
	    qty
	    discount
	    total
	    taxes : { 
	              taxId
				  percentage
				  name 
			    }
	  }
    ]

documents
  {
    id
    name
	prefix
	next_number
	sufix
	type enum [invoice, credit, payment]
	status
	companyid (ObjectId)
	create_date
	modified_date
  }

users
  {
    id
    email
	username
	password
	isadmin
	companyId (ObjectId)
	access:  {
	           applicationId (ObjectId)
			   add_data
			   upd_data
			   del_data
	         }
	status
	create_date
	modified_date
  }

  
cashier_logs
  {
    userId
	cashierId
	Initial_Ope
	Final_Ope
  }

logs {
       id
       schema
	   old_data
	   new_data
	   create_date
	   userId (ObjectId)
     }

subscriptions
  {
    id
	adquisition_date
	expire_date
	status
	bank_name
	account_name
	iban
	debit_auth
	subs_details : {
	                 line_no
					 qty
					 pirce
	               }
	create_date
	modified_date 
  }
  
  */
