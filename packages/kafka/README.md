
# Integration with Kafka

## Install python environments

### pyenv

```
$ git clone https://github.com/pyenv/pyenv.git ~/.pyenv
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
$ source .bashrc
$ pyenv install 3.7.0
$ pyenv shell 3.7.0
$ python --version
$ pip install --upgrade pip
$ pip --version
```

### pipenv

`Install pipenv`

```bash
$ pip install --user pipenv
```

`Install project`

```bash
$ pipenv install
```

`Enable virtual environments`

```
$ pipenv shell
$ pipenv --venv
$ pipenv --py
```

## Kafka with Docker

`Install Docker`

```bash
$ brew cask install docker
$ docker --version
$ docker-compose --version
$ docker run hello-world
```

```bash
$ docker run --rm -it \
           -p 2181:2181 -p 3030:3030 -p 8081:8081 \
           -p 8082:8082 -p 8083:8083 -p 9092:9092 \
           -e ADV_HOST=127.0.0.1 \
           landoop/fast-data-dev &>/dev/null &
```
> You may visit http://127.0.0.1:3030 in about a minute.


Do you need to execute kafka related console tools? Whilst your Kafka containers is running, try something like:

```bash
$ docker run --rm -it --net=host landoop/fast-data-dev kafka-topics --zookeeper localhost:2181 --list
```

Or enter the container to use any tool as you like:

```bash
$ docker run --rm -it --net=host landoop/fast-data-dev bash
```

`View logs`


You can view the logs from the web interface. If you prefer the command line, every application stores its logs under /var/log inside the container. If you have your container's ID, or name, you could do something like:

```bash
$ docker exec -it <ID> cat /var/log/broker.log
```
