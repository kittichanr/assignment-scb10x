VENV=.venv
ACTIVATE=. $(VENV)/bin/activate

.PHONY: init run clean

init:
	python3 -m venv .venv
	$(ACTIVATE) && python3 -m pip install -r ./requirements.txt
	$(ACTIVATE) && flask db migrate
	$(ACTIVATE) && flask db upgrade

run:
	$(ACTIVATE) && FLASK_DEBUG=1 flask run

clean:
	rm -rf $(VENV)