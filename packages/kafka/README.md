
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

