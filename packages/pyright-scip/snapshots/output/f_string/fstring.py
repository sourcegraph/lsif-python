# < definition scip-python python snapshot-util 0.1 fstring/__init__:
#documentation (module) fstring

var = ", world!"
#^^ definition  snapshot-util 0.1 fstring/var.
#documentation ```python
#            > builtins.str
#            > ```

print(f"var: hello {var}")
#^^^^ reference  python-stdlib 3.10 builtins/__init__:print().
#external documentation ```python
#            > (function)
#            > print(*values: object, sep: str | None =...
#            > 
#            > print(*values: object, sep: str | None =...
#            > ```
#                   ^^^ reference  snapshot-util 0.1 fstring/var.

