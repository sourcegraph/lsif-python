# < definition lsif-pyright pypi snapshot-util 0.1 builtin_import_refs/__init__:
#documentation (module) builtin_import_refs

from typing import Any
#    ^^^^^^ reference  snapshot-util 0.1 typing/__init__:
#                  ^^^ reference  python-stdlib 3.10 typing/Any.

print(Any)
#^^^^ reference  python-stdlib 3.10 builtins/print().
#     ^^^ reference  python-stdlib 3.10 typing/Any.

