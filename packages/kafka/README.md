
# Integration with Kafka

## Install python environments

```
$ git clone https://github.com/pyenv/pyenv.git ~/.pyenv
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
$ source .bash_profile
$ pyenv install 3.7.0
$ pyenv shell 3.7.0
$ python --version
$ pip install --upgrade pip
$ pip --version
...
$ git clone git://github.com/kennethreitz/autoenv.git $HOME/.autoenv
$ echo 'source ~/.autoenv/activate.sh' >> $HOME/.bash_profile
$ source .bash_profile
```
