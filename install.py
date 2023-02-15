import launch


if not launch.is_installed("dataclasses_json"):
    launch.run_pip("install dataclasses_json", "requirements for prompt translator")