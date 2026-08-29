"""Shared test fixtures."""

import logging

import aiohttp.connector
import aiohttp.resolver

pytest_plugins = "pytest_homeassistant_custom_component"

# homeassistant hard-depends on aiodns on macOS/Linux, so aiohttp picks
# AsyncResolver as its default resolver. pycares 5.x spawns a background
# thread for it ("_run_safe_shutdown_loop") already at TCPConnector
# construction time — before any real DNS lookup happens (hass_ws_client and
# aiohttp_client both connect to 127.0.0.1, where no resolver is needed at all).
# The "no leftover background threads" check in
# pytest_homeassistant_custom_component sees this thread as a leak and fails
# the test at teardown, even though the test itself passed. ThreadedResolver
# only uses loop.getaddrinfo and spawns no background threads. The
# integration's production code never talks to aiohttp directly, so this
# monkeypatch is safe and only affects the test process.
aiohttp.connector.DefaultResolver = aiohttp.resolver.ThreadedResolver


def pytest_configure(config):
    """Configure logging: hide INFO/DEBUG output from dependencies.

    pytest_homeassistant_custom_component explicitly sets sqlalchemy.engine
    to INFO level, which leaks log output into CI test runs. DEBUG logs from
    the Home Assistant recorder pool need to be suppressed too. This hook
    runs after plugins are loaded, so it can override the log levels for
    these specific loggers.
    """
    sqlalchemy_logger = logging.getLogger("sqlalchemy.engine")
    sqlalchemy_logger.setLevel(logging.WARNING)
    # The whole recorder tree, not just .pool: .core emits DEBUG lines whenever
    # a task happens to be processed while a test is running, so silencing one
    # submodule left the "pristine output" gate passing by luck rather than by
    # construction. It went red the moment an added test shifted the timing.
    recorder_logger = logging.getLogger("homeassistant.components.recorder")
    recorder_logger.setLevel(logging.WARNING)
