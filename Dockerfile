FROM node:lts-slim

ENV PATH=$PATH:/app/node_modules/.bin

<<<<<<< HEAD
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        wait-for-it

||||||| cb2f600
=======
WORKDIR /tmp
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y alien libaio1 wget
RUN wget https://yum.oracle.com/repo/OracleLinux/OL7/oracle/instantclient/x86_64/getPackage/oracle-instantclient19.3-basiclite-19.3.0.0.0-1.x86_64.rpm
RUN alien -i --scripts oracle-instantclient*.rpm
RUN rm -f oracle-instantclient19.3*.rpm && apt-get -y autoremove && apt-get -y clean

>>>>>>> 74e27c7fe0c4527b82c7c001855f5b9f3a8cb3b4
WORKDIR /app
COPY . .
