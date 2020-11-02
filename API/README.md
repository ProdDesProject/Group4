# bci_project
Web application API which primary function is to serve as a platform for selling and buying used items. An example of this in Finland would be Tori.fi or globally ebay.com.

---

#### Overview

Students Email: k0jowa00@students.oamk.fi

API is running on a virtual machine at https://www.bw-cloud.org/en/ in a Docker container.

**Access the API in Postman with this address: http://193.196.54.219:3000/**

---

#### Getting started

Clone the Github repository

    git clone https://github.com/HauptschuIe/bci_project.git

Install Node.js

    sudo apt update
    curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
    sudo apt install nodejs

Check the installation

    node --version

Install docker

https://docs.docker.com/engine/install/

Install docker-compose

https://docs.docker.com/compose/install/

Run the API

    docker-compose up -d

Stop the API
    
    docker-compose down

Make sure that the port 3000 is open in the network security group
